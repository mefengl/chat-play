import askForLanguage from '../askForLanguage';
import chatkit from 'chatkit';

async function startInfiniteLoop() {
  const language = await askForLanguage();
  if (!language) return;
  chatkit.send(`you can only answer question in ${language} language`);
  await chatkit.waitForIdle();
  
  while (true) {
    const lastResponse = chatkit.getLastResponse();
    const question = extractQuestion(lastResponse);
    await chatkit.send(question + "\nanswer above question, and show me one more further question I can ask in the end prefixed with Q:");
    await chatkit.waitForIdle();
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
