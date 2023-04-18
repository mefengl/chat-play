import { chatgpt } from 'chatkit';
import createButton from './createButton';
import getParagraphs from './getParagraphs';

declare function GM_setValue(name: string, value: any): void;

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  const key = 'prompt_texts';
  // ChatGPT response to prompt_texts
  chatgpt.setListener(key);

  const translateWeb = async () => {
    const paragraphs = getParagraphs();
    const prompt_texts: string[] = paragraphs.map((paragraph: string) => {
      return `${paragraph}\n\ntranslate above paragraph to Chinese with compact and intuitive format (use Markdown syntax to optimize the display format):`;
    });
    GM_setValue(key, prompt_texts);
  };
  createButton(translateWeb);
}

(function () {
  main();
}());
