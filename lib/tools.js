export const SITE = { name: 'PlainPDF', url: 'https://pdf-converter-anbd.onrender.com' };

export const TOOLS = {
  'jpg-to-pdf': {
    kind: 'img2pdf', accept: 'image/jpeg,image/png', multiple: true,
    title: 'JPG to PDF Converter', short: 'JPG to PDF',
    desc: 'Combine JPG and PNG images into one PDF. Free, no signup, files stay on your device.',
    cta: 'Convert to PDF', drop: 'Drop JPG or PNG images here',
    steps: ['Add one or more images.', 'Check the order of the files.', 'Select Convert to PDF and save the file.'],
    faq: [['Is my file uploaded?', 'No. The conversion runs in your browser, so your images never leave your device.'],
          ['Can I add many images?', 'Yes. Each image becomes one page, in the order listed.']],
  },
  'pdf-to-jpg': {
    kind: 'pdf2jpg', accept: 'application/pdf', multiple: false,
    title: 'PDF to JPG Converter', short: 'PDF to JPG',
    desc: 'Turn every page of a PDF into a high-quality JPG image. Free and private.',
    cta: 'Convert to JPG', drop: 'Drop a PDF here',
    steps: ['Add a PDF.', 'Select Convert to JPG.', 'Save the ZIP file with one JPG per page.'],
    faq: [['What quality are the images?', 'Pages render at twice their normal size for sharp text.'],
          ['Is my file uploaded?', 'No. Everything happens in your browser.']],
  },
  'merge-pdf': {
    kind: 'merge', accept: 'application/pdf', multiple: true,
    title: 'Merge PDF Files', short: 'Merge PDF',
    desc: 'Join several PDFs into a single document. Free, fast and private.',
    cta: 'Merge PDFs', drop: 'Drop two or more PDFs here',
    steps: ['Add the PDFs you want to join.', 'Check the order of the files.', 'Select Merge PDFs and save the result.'],
    faq: [['Is there a page limit?', 'No fixed limit. Very large files depend on your device memory.'],
          ['Is my file uploaded?', 'No. Merging runs in your browser.']],
  },
};
