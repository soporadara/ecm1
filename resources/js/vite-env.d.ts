/// <reference types="vite/client" />

declare const route: (...args: any[]) => string;

interface Window {
    axios?: typeof import('axios').default;
}
