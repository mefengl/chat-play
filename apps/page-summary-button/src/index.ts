import { setPromptListener } from '@mefengl/chatkit/chatgpt';
import createButton from './createButton';
import getParagraphs from './getParagraphs';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();

  const key = 'prompt_texts';
  setPromptListener(key);
  const summaryWeb = async () => {
    const paragraphs = getParagraphs();
    console.log(paragraphs);
    const prompt_texts: string[] = paragraphs.map((paragraph: string) => {
      return `"""\n${paragraph}\n"""\nSummarize this paragraph into a bulleted list of the most important information, prefix with emoji. Use Markdown syntax to optimize the display format:`;
    });
    console.log(prompt_texts);
    GM_setValue(key, prompt_texts);
  };
  createButton(summaryWeb);
}

(function () {
  main();
}());
