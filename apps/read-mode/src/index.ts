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
    let html = getResponseElementHTMLs();
    if (html.length === 0) {
      html = ['<p>No responses available.</p>'];
    }
    displayHTML(html);
  }
  GM_registerMenuCommand("📖 Read Mode", displayReadMode);
})();
