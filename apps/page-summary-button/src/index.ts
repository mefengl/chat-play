import { setPromptListener } from 'chatkit/chatgpt';
import createButton from './createButton';
import getParagraphs from './getParagraphs';
import MenuManager from './MenuManger';
import { getLocalLanguage } from '@mefengl/monkit';

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
  const summaryWeb = async () => {
    const paragraphs = getParagraphs();
    console.log(paragraphs);
    const prompt_texts: string[] = paragraphs.map((paragraph: string) => {
      return `"""\n${paragraph}\n"""\nSummarize this paragraph into a bulleted list of the most important information, prefix with emoji, in ${chatLanguage} language. Use Markdown syntax to optimize the display format:`;
    });
    console.log(prompt_texts);
    GM_setValue(key, prompt_texts);
  };
  createButton(summaryWeb);
}

(function () {
  main();
}());
