/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID público do Pixel da Meta. Vazio desativa o Pixel e o banner de cookies. */
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
