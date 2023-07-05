import { setPromptListener } from 'chatkit/chatgpt';
import createButton from './createButton';
import getParagraphs from './getParagraphs';
import { getLocalLanguage, MenuManager } from '@mefengl/monkit';

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

  const key = 'prompt_texts';
  setPromptListener(key);

  const translateWeb = async () => {
    const paragraphs = getParagraphs();
    const prompt_texts: string[] = paragraphs.map((paragraph: string) => {
      return `"""\n${paragraph}\n"""\ntranslate above paragraphs in """ to ${chatLanguage} with compact and intuitive format (use Markdown syntax to optimize the display format):`;
    });
    GM_setValue(key, prompt_texts);
  };

  let buttonText = "Page Translate";
  if (navigator.language.startsWith("zh")) {
    buttonText = "页面翻译";
  }
  createButton(translateWeb, buttonText);
}

(function () {
  main();
}());
