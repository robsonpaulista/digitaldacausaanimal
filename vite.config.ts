import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: https://*.cdninstagram.com https://*.fbcdn.net",
  "font-src 'self'",
  "connect-src 'self' https://servicodados.ibge.gov.br https://nominatim.openstreetmap.org",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

/** Só no build: o servidor de desenvolvimento do Vite depende de scripts inline (HMR). */
function securityMeta(): Plugin {
  return {
    name: 'security-meta',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html) =>
        html.replace(
          /<meta charset="UTF-8" \/>/,
          (charset) =>
            `${charset}\n    <meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}" />` +
            '\n    <meta name="referrer" content="strict-origin-when-cross-origin" />',
        ),
    },
  };
}

const PRIVATE_FILE = /\.(xlsx|xls|csv)$/i;

/** O servidor de desenvolvimento entrega qualquer arquivo da raiz; planilhas têm dados pessoais. */
function blockPrivateFiles(): Plugin {
  return {
    name: 'block-private-files',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = 'url' in req && typeof req.url === 'string' ? req.url : '';
        const path = decodeURIComponent(url.split('?')[0]);
        if (!PRIVATE_FILE.test(path)) return next();
        res.statusCode = 404;
        res.end();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), securityMeta(), blockPrivateFiles()],
});
