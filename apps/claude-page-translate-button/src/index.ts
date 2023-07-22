import { setPromptListener } from 'chatkit/claude';
import createButton from './createButton';
import getParagraphs from './getParagraphs';
import { getLocalLanguage, MenuManager } from '@mefengl/monkit';
import SimpleArticleSegmentation from './SimpleArticleSegmentation';
import Swal from 'sweetalert2';

async function initialize() {
  await new Promise(r => window.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 1000));
}

(async () => {
  await initialize();

  const menu = new MenuManager({ "chat_language": getLocalLanguage() || "Chinese" });
  const lang = menu.getMenuValue("chat_language");

  const setPrompts = (paras: string[]) => GM_setValue('prompt_texts', paras.map((p, i) => `Answer me in ${lang} language with good segmentation,\nTranslate below paragraphs:\n\n"""${p}${i + 1}/${paras.length}"""\n\nps: answer in ${lang} language`));

  GM_registerMenuCommand('📝 Input', () => {
    Swal.fire({ title: 'Please input the text you want to deal with', input: 'text', inputPlaceholder: 'Enter your text here' })
      .then((result) => {
        if (result.value) setPrompts(new SimpleArticleSegmentation(result.value).segment());
      });
  });

  setPromptListener('prompt_texts');

  createButton(async () => setPrompts(getParagraphs()), navigator.language.startsWith("zh") ? "页面翻译" : "Page Translate");
})();
