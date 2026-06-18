import { readFileSync, writeFileSync } from 'fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync('public/logo-mark.svg');

for (const size of [16, 32, 180]) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
  const png = resvg.render().asPng();
  const name = size === 180 ? 'public/apple-touch-icon.png' : `public/favicon-${size}.png`;
  writeFileSync(name, png);
  console.log(`Generated ${name}`);
}
