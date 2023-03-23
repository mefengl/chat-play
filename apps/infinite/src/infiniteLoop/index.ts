import askForLanguage from '../askForLanguage';

function getTextarea() {
  const form = document.querySelector('form');
  const textareas = form.querySelectorAll('textarea');
  const result = textareas[0];
  return result;
};

function getSubmitButton() {
  const form = document.querySelector('form');
  const buttons = form.querySelectorAll('button');
  const result = buttons[buttons.length - 1];
  return result;
};

function getRegenerateButton() {
  const form = document.querySelector('form');
  const buttons = form.querySelectorAll('button');
  const result = Array.from(buttons).find(button => button.textContent.trim().toLowerCase().includes('regenerate'));
  return result;
};

function getLastResponseElement () {
  const responseElements = document.querySelectorAll('.group.w-full');
  return responseElements[responseElements.length - 1];
};

function getLastResponse() {
  const lastResponseElement = getLastResponseElement();
  if (!lastResponseElement) return;
  const lastResponse = lastResponseElement.textContent;
  return lastResponse;
};

function setTextarea(text) {
  const textarea = getTextarea();
  textarea.value = text;
  textarea.dispatchEvent(new Event('input'));
}

function send(message) {
  setTextarea(message);
  getSubmitButton().click();
}

async function startInfiniteLoop() {
  const language = await askForLanguage();
  if (!language) return;
  send(`you can only answer question in ${language} language`);
  await waitForIdle();
  
  while (true) {
    const lastResponse = getLastResponse();
    const question = extractQuestion(lastResponse);
    await send(question + "\nanswer above question, and show me one more further question I can ask in the end prefixed with Q:");
    await waitForIdle();
    await sleep(5000);
  }
}

function extractQuestion(text) {
  return text.split("Q:").pop().trim();
}

function waitForIdle() {
  return new Promise<void>(resolve => {
    const interval = setInterval(() => {
      if (getRegenerateButton()) {
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
