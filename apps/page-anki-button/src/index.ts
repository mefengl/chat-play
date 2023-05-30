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

  const createAnkiCards = async () => {
    const paragraphs = getParagraphs();
    const prompt_texts: string[] = paragraphs.map((paragraph: string) => {
      return `Please help me create Anki cards for some material that I am studying. I would like to use these cards to remember facts and information in this material. Each Anki card should be of the format:

{FRONT} ; {BACK}

Where {FRONT} is the front of the card, and {BACK} is the back of the card, and they are separated by a semi-colon. The way it works is that Anki will show me the {FRONT} of the card, which contains some kind of question, and I will have to correctly recall the {BACK} of the card. Please give me the Anki cards one per line so it is easy for me to copy paste and import them into Anki. Make sure to be thorough and cover most of the information in the given material. Here are some examples of good Anki cards:

What is the capital city of California? ; Sacramento
How many U.S. states are there? ; 50
What is the smallest U.S. state? ; Wyoming

Etc. Now here is the material I’d like you to create Anki cards for:

${paragraph}`;
    });
    GM_setValue(key, prompt_texts);
  };
  createButton(createAnkiCards);
}

(function () {
  main();
}());
