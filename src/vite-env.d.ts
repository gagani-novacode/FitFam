/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KOKO_ENABLED: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}