import { onSend, getTextareaValue, setTextarea } from 'chatkit/chatgpt';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  onSend(() => {
    const textareaValue = getTextareaValue();
    const smartPrompt = `Question:${textareaValue}\n\nAnswer: Let's work this out in a step by step way to be sure we have the right answer`;
    setTextarea(smartPrompt);
  });
}

(function () {
  main();
}());
