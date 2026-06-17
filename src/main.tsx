import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './i18n';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register Progressive Web App service worker for advanced offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('[Eurosia PWA] Service Worker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.error('[Eurosia PWA] Service Worker registration failed:', err);
      });
  });
}
