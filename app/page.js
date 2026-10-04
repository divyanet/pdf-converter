import Link from 'next/link';
import { TOOLS } from '../lib/tools';

export default function Home() {
  return (
    <section className="wrap">
      <h1>PDF tools that never upload your files</h1>
      <p className="lead">Convert and merge PDFs right in your browser. Free, with no signup.</p>
      <div className="grid">
        {Object.entries(TOOLS).map(([slug, t]) => (
          <Link key={slug} href={`/${slug}`} className="card">
            <h2>{t.short}</h2>
            <p>{t.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
