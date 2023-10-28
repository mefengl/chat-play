import { getResponseElementHTMLs, setPromptListener } from 'chatkit/chatgpt';
import { getLocalLanguage, MenuManager } from '@mefengl/monkit';
import { Swal, displayHTML, SimpleArticleSegmentation, getParagraphs } from 'page-button';
import createButton from './createButton';

async function initialize() {
  await new Promise(r => window.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 1000));
}

(async () => {
  await initialize();

  const menu = new MenuManager({ "chat_language": getLocalLanguage() || "Chinese" });
  const lang = menu.getMenuValue("chat_language");

  const setPrompts = (paras: string[]) => GM_setValue('prompt_texts', paras.map((p, i) => `Answer me in several paragraphs in ${lang} language,\nTranslate below paragraphs:\n\n${p}${i + 1}/${paras.length}\n\nps: translate in several paragraphs in ${lang} language`));

  GM_registerMenuCommand('📝 Input', () => {
    Swal.fire({ title: 'Please input the text you want to deal with', input: 'textarea', inputPlaceholder: 'Enter your text here' })
      .then((result) => {
        if (result.value) setPrompts(new SimpleArticleSegmentation(result.value).segment());
      });
  });

  setPromptListener('prompt_texts');

  createButton(async () => setPrompts(getParagraphs()), navigator.language.startsWith("zh") ? "页面翻译" : "Page Translate");

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
