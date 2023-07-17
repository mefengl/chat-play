import { setPromptListener } from 'chatkit/chatgpt';
import createButton from './createButton';
import getParagraphs from './getParagraphs';
import { getLocalLanguage, MenuManager } from '@mefengl/monkit';
import SimpleArticleSegmentation from './SimpleArticleSegmentation';
import Swal from 'sweetalert2';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();

  const defaultMenu = {
    "chat_language": getLocalLanguage() || "Chinese",
  };
  const menuManager = new MenuManager(defaultMenu);
  const chatLanguage = menuManager.getMenuValue("chat_language");

  GM_registerMenuCommand('📝 Input', () => {
    Swal.fire({
      title: 'Please input the text you want to deal with',
      input: 'text',
      inputPlaceholder: 'Enter your text here'
    }).then((result) => {
      if (result.value) {
        const text = result.value;
        const segmenter: SimpleArticleSegmentation = new SimpleArticleSegmentation(text);
        const paragraphs: string[] = segmenter.segment();
        console.log(paragraphs);
        const lenParagraphs = paragraphs.length;
        const prompt_texts: string[] = paragraphs.map((paragraph: string, index: number) => {
          return `"""\n${paragraph}\n${index + 1}/${lenParagraphs}\n"""`;
        });
        GM_setValue('prompt_texts', prompt_texts.map(p =>
          `Answer me in ${chatLanguage} language with good segmentation,\n`
          + `\nSummarize below paragraph into a bulleted list of the most important information, prefix with emoji:\n\n${p}`
          + `\n\nps: answer in ${chatLanguage} language`
        ));
      }
    });
  });

  const key = 'prompt_texts';
  setPromptListener(key);

  const summaryWeb = async () => {
    const paragraphs = getParagraphs();
    console.log(paragraphs);
    const lenParagraphs = paragraphs.length;
    const prompt_texts: string[] = paragraphs.map((paragraph: string, index: number) => {
      return `"""\n${paragraph}\n${index + 1}/${lenParagraphs}\n"""`;
    });
    GM_setValue('prompt_texts', prompt_texts.map(p =>
      `Answer me in ${chatLanguage} language with good segmentation,\n`
      + `\nSummarize below paragraph into a bulleted list of the most important information, prefix with emoji:\n\n${p}`
      + `\n\nps: answer in ${chatLanguage} language`
    ));
  };

  let buttonText = "Page Summary";
  if (navigator.language.startsWith("zh")) {
    buttonText = "页面摘要";
  }
  createButton(summaryWeb, buttonText);
}

(function () {
  main();
}());
