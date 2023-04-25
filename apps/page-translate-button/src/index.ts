import { setPromptListener } from '@mefengl/chatkit/chatgpt';
import createButton from './createButton';
import getParagraphs from './getParagraphs';
import MenuManager from './MenuManger';
import getLocalLanguage from './getLocalLanguage';

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
  createButton(translateWeb);
}

(function () {
  main();
}());
