import { notFound } from 'next/navigation';
import Tool from '../../components/Tool';
import { TOOLS } from '../../lib/tools';

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(TOOLS).map((tool) => ({ tool }));

export async function generateMetadata({ params }) {
  const slug = (await params).tool;
  const t = TOOLS[slug];
  return t ? { title: t.title, description: t.desc, alternates: { canonical: `/${slug}` } } : {};
}

export default async function Page({ params }) {
  const t = TOOLS[(await params).tool];
  if (!t) notFound();
  const ld = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <section className="wrap">
      <h1>{t.title}</h1>
      <p className="lead">{t.desc}</p>
      <Tool kind={t.kind} accept={t.accept} multiple={t.multiple} cta={t.cta} drop={t.drop} />
      <h2>How to use it</h2>
      <ol className="steps">{t.steps.map((s) => <li key={s}>{s}</li>)}</ol>
      <h2>Questions</h2>
      {t.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}
