import { SITE, TOOLS } from '../lib/tools';
export default function sitemap() {
  return ['', ...Object.keys(TOOLS)].map((p) => ({ url: `${SITE.url}/${p}` }));
}
