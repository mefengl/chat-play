import { setPromptListener } from 'chatkit/claude';
import { getLocalLanguage, MenuManager } from '@mefengl/monkit';
import { SimpleArticleSegmentation, getParagraphs } from 'page-button';
import Swal from 'sweetalert2';
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
    Swal.fire({ title: 'Please input the text you want to deal with', input: 'text', inputPlaceholder: 'Enter your text here' })
      .then((result) => {
        if (result.value) setPrompts(new SimpleArticleSegmentation(result.value).segment());
      });
  });

  setPromptListener('prompt_texts');

  createButton(async () => setPrompts(getParagraphs()), navigator.language.startsWith("zh") ? "页面翻译" : "Page Translate");
})();
