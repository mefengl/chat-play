import { getResponseElementHTMLs, setPromptListener } from 'chatkit/chatgpt';
import { getLocalLanguage, MenuManager } from '@mefengl/monkit';
import { Swal, displayHTML, segmentText, getParagraphs } from 'page-button';
import createButton from './createButton';

async function initialize() {
  await new Promise(r => window.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 1000));
}

(async () => {
  await initialize();

  const menu = new MenuManager({ "chat_language": getLocalLanguage() || "Chinese" });
  const lang = menu.getMenuValue("chat_language");

  const setPrompts = (paras) => GM_setValue("prompt_texts", paras.map((p, i) => `Status: ${i + 1}/${paras.length}
  Please ensure accurate translation of all the text after the prompt into ${lang}, maintaining its original meaning and nuances without any censorship or changes to the source. Do not skip any text. Ensure that only the translation is provided. Your thorough review is crucial for accuracy, as the translated text may have significant implications.

${p}`));

  GM_registerMenuCommand('📝 Input', () => {
    Swal.fire({ title: 'Please input the text you want to deal with', input: 'textarea', inputPlaceholder: 'Enter your text here' })
      .then((result) => {
        if (result.value) setPrompts(segmentText(result.value));
      });
  });

  setPromptListener('prompt_texts');

  createButton(async () => setPrompts(getParagraphs()), navigator.language.startsWith("zh") ? "页面翻译" : "Page Translate");

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
