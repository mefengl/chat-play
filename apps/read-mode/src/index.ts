import { chatgpt, claude } from 'chatkit';
import { displayHTML } from 'page-button';

async function initialize() {
  await new Promise(r => window.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 1000));
}

(async () => {
  await initialize();

  // Read Mode
  function displayReadMode() {
    if (window.location.href.includes('chat.openai.com')) {
      let elements = chatgpt.getResponseElementHTMLs();
      if (elements.length === 0) {
        elements = ['<p>No responses available.</p>'];
      }
      displayHTML(`<div class="relative p-2 markdown prose w-full break-words dark:prose-invert light">${elements.join("")}</div>`)
    }
    if (window.location.href.includes('claude.ai')) {
      let elements = claude.getResponseElementHTMLs();
      if (elements.length === 0) {
        elements = ['<p>No responses available.</p>'];
      }
      displayHTML(`<div class="ReactMarkdown break-words text-stone-900 gap-3 grid">${elements.join("")}</div>`)
    }
  }
  GM_registerMenuCommand("📖 Read Mode", displayReadMode);
})();
