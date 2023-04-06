import { chatgpt } from 'chatkit';
import askForLanguage from '../askForLanguage';

async function startInfiniteLoop() {
  const language = await askForLanguage();
  if (!language) return;
  chatgpt.send(`you can only answer question in ${language} language`);
  await chatgpt.waitForIdle();
  
  while (true) {
    const lastResponse = chatgpt.getLastResponse();
    const question = extractQuestion(lastResponse);
    await chatgpt.send(question + "\nanswer above question, and show me one more further question I can ask in the end prefixed with Q:");
    await chatgpt.waitForIdle();
    await sleep(10000);
  }
}

function extractQuestion(text) {
  return text.split("Q:").pop().trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default startInfiniteLoop;
