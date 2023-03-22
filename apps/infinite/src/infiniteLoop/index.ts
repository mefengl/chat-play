import ChatGPT from 'chatgpt'
import askForLanguage from '../askForLanguage';

const chatgpt = new ChatGPT();

async function startInfiniteLoop() {
  const language = await askForLanguage();
  if (!language) return;
  
  chatgpt.send(`you can only answer question in ${language} language`);
  await waitForIdle();
  
  while (true) {
    const lastResponse = chatgpt.getLastResponse();
    const question = extractQuestion(lastResponse);
    await chatgpt.send(question + "\nanswer above questions, and show me further question I can ask in the end prefixed with Q:");
    await waitForIdle();
    await sleep(5000);
  }
}

function extractQuestion(text) {
  const match = text.match(/Q:(.*)/);
  return match ? match[1].trim() : "Can you generate a question?";
}

function waitForIdle() {
  return new Promise<void>(resolve => {
    const interval = setInterval(() => {
      if (chatgpt.getRegenerateButton()) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default startInfiniteLoop;
