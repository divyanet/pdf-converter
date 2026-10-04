'use client';
import { useRef, useState } from 'react';

function save(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

async function convert(kind, files) {
  if (kind === 'img2pdf') {
    const { PDFDocument } = await import('pdf-lib');
    const pdf = await PDFDocument.create();
    for (const f of files) {
      const bytes = await f.arrayBuffer();
      const img = f.type === 'image/png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
      pdf.addPage([img.width, img.height]).drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    save(new Blob([await pdf.save()], { type: 'application/pdf' }), 'images.pdf');
  } else if (kind === 'merge') {
    const { PDFDocument } = await import('pdf-lib');
    const out = await PDFDocument.create();
    for (const f of files) {
      const src = await PDFDocument.load(await f.arrayBuffer());
      (await out.copyPages(src, src.getPageIndices())).forEach((p) => out.addPage(p));
    }
    save(new Blob([await out.save()], { type: 'application/pdf' }), 'merged.pdf');
  } else {
    const pdfjs = await import('pdfjs-dist');
    // pdf.worker.min.mjs is copied to /public so the worker has a real fetchable URL
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
    const doc = await pdfjs.getDocument({ data: await files[0].arrayBuffer() }).promise;
    const zip = new (await import('jszip')).default();
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const vp = page.getViewport({ scale: 2 });
      const c = document.createElement('canvas');
      c.width = vp.width; c.height = vp.height;
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      zip.file(`page-${i}.jpg`, await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.92)));
    }
    save(await zip.generateAsync({ type: 'blob' }), 'pages.zip');
  }
}

export default function Tool({ kind, accept, multiple, cta, drop }) {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [msg, setMsg] = useState('');
  const input = useRef();

  const add = (list) => {
    const next = [...list].filter((f) => accept.split(',').includes(f.type));
    if (!next.length) return setMsg('That file type is not supported here. ' + drop.replace(' here', '') + ' instead.');
    setMsg('');
    setFiles(multiple ? [...files, ...next] : next.slice(0, 1));
  };
  const move = (i, d) => {
    const a = [...files]; const j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]]; setFiles(a);
  };
  const run = async () => {
    setBusy(true); setMsg('');
    try { await convert(kind, files); setMsg('Done. Your file was saved.'); }
    catch { setMsg('Conversion failed. The file may be damaged or password-protected.'); }
    setBusy(false);
  };

  return (
    <div className="tool">
      <div className={'drop' + (over ? ' over' : '')}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}>
        <p>{drop}</p>
        <button className="ghost" onClick={() => input.current.click()}>Choose files</button>
        <input ref={input} type="file" hidden accept={accept} multiple={multiple}
          onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
      </div>
      {files.length > 0 && (
        <ul className="files">
          {files.map((f, i) => (
            <li key={i}>
              <span>{f.name}</span>
              {multiple && <span className="row">
                <button aria-label="Move up" onClick={() => move(i, -1)}>Up</button>
                <button aria-label="Move down" onClick={() => move(i, 1)}>Down</button>
              </span>}
              <button aria-label={'Remove ' + f.name} onClick={() => setFiles(files.filter((_, k) => k !== i))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button className="go" disabled={busy || !files.length || (kind === 'merge' && files.length < 2)} onClick={run}>
        {busy ? 'Working…' : cta}
      </button>
      <p className="msg" role="status">{msg}</p>
    </div>
  );
}
