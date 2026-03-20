import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { GameProvider } from './context/GameContext';

// Global error handler to display errors on screen
window.addEventListener('error', (event) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:red;color:white;z-index:999999;padding:20px;overflow:auto;font-family:monospace;';
  errorDiv.innerHTML = `
    <h1>RUNTIME ERROR</h1>
    <p><strong>Message:</strong> ${event.message}</p>
    <p><strong>Source:</strong> ${event.filename}:${event.lineno}:${event.colno}</p>
    <pre>${event.error?.stack || 'No stack trace available'}</pre>
  `;
  document.body.appendChild(errorDiv);
});

window.addEventListener('unhandledrejection', (event) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:orange;color:white;z-index:999999;padding:20px;overflow:auto;font-family:monospace;';
  errorDiv.innerHTML = `
    <h1>UNHANDLED PROMISE REJECTION</h1>
    <p><strong>Reason:</strong> ${event.reason}</p>
    <pre>${event.reason?.stack || 'No stack trace available'}</pre>
  `;
  document.body.appendChild(errorDiv);
});

console.log("main.tsx: Starting initialization...");

const root = document.getElementById('root');
if (root) {
  console.log("main.tsx: Root element found, rendering...");
  createRoot(root).render(
    <GameProvider>
      <App />
    </GameProvider>
  );
  console.log("main.tsx: Render called");
} else {
  console.error("main.tsx: Root element not found!");
}
