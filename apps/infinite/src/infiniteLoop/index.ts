import askForLanguage from '../askForLanguage';
import { send, waitForIdle, getLastResponse } from 'chatkit/chatgpt';

async function startInfiniteLoop() {
  const language = await askForLanguage();
  if (!language) return;
  send(`you can only answer question in ${language} language`);
  await waitForIdle();

  while (true) {
    const lastResponse = getLastResponse();
    const question = extractQuestion(lastResponse);
    await send(question + "\nanswer above question in 1000 words, and show me one more further question I can ask in the end prefixed with Q:");
    await waitForIdle();
    await sleep(3000);
  }
}

function extractQuestion(text) {
  return text.split("Q:").pop().trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default startInfiniteLoop;
