import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

if (typeof window !== 'undefined') {
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');

    const updateShellState = () => {
        const isStandalone = standaloneQuery.matches || window.navigator.standalone === true;

        document.documentElement.dataset.displayMode = isStandalone ? 'standalone' : 'browser';
    };

    updateShellState();
    standaloneQuery.addEventListener('change', updateShellState);
    window.addEventListener('appinstalled', updateShellState);
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
