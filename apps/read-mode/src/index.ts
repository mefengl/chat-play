import { getResponseElementHTMLs } from 'chatkit/chatgpt';
import { displayHTML } from 'page-button';

async function initialize() {
  await new Promise(r => window.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 1000));
}

(async () => {
  await initialize();

  // Read Mode
  function displayReadMode() {
    let elements = getResponseElementHTMLs();
    if (elements.length === 0) {
      elements = ['<p>No responses available.</p>'];
    }
    displayHTML(`<div class="relative p-2 markdown prose w-full break-words dark:prose-invert light">${elements.join("")}</div>`)
  }
  GM_registerMenuCommand("📖 Read Mode", displayReadMode);
})();
