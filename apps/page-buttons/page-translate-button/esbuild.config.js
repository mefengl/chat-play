import { build } from 'esbuild';
import metadata from './src/metadata.js';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/script.user.js',
  platform: 'browser',
  target: 'es2015',
  banner: { js: metadata.trim() },
}).catch(() => process.exit(1));
