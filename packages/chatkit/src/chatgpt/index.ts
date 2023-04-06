export function getTextarea() {
  const form = document.querySelector('form');
  if (!form) return;
  const textareas = form.querySelectorAll('textarea');
  const result = textareas[0];
  return result;
};

export function getSubmitButton() {
  const form = document.querySelector('form');
  if (!form) return;
  const buttons = form.querySelectorAll('button');
  const result = buttons[buttons.length - 1];
  return result;
};

export function getRegenerateButton() {
  const form = document.querySelector('form');
  if (!form) return;
  const buttons = form.querySelectorAll('button');
  const result = Array.from(buttons).find(button => button.textContent?.trim().toLowerCase().includes('regenerate'));
  return result;
};

export function getStopGeneratingButton() {
  const form = document.querySelector('form');
  if (!form) return;
  const buttons = form.querySelectorAll('button');
  const result = Array.from(buttons).find(button => button.textContent?.trim().toLowerCase().includes('stop generating'));
  return result;
};

export function getLastResponseElement() {
  const responseElements = document.querySelectorAll('.group.w-full');
  return responseElements[responseElements.length - 1];
};

export function getLastResponse() {
  const lastResponseElement = getLastResponseElement();
  if (!lastResponseElement) return;
  const lastResponse = lastResponseElement.textContent;
  return lastResponse;
};

export function getTextareaValue() {
  return getTextarea()?.value || '';
}

export function setTextarea(message: string) {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.value = message;
  textarea.dispatchEvent(new Event('input'));
}

export function send(message: string) {
  setTextarea(message);
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
}

export function onSend(callback: () => void) {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      callback();
    }
  });
  const sendButton = getSubmitButton();
  if (!sendButton) return;
  sendButton.addEventListener('mousedown', callback);
}

export function waitForIdle() {
  return new Promise<void>(resolve => {
    const interval = setInterval(() => {
      if (!getStopGeneratingButton()) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

const chatgpt = {
  getTextarea,
  getSubmitButton,
  getRegenerateButton,
  getStopGeneratingButton,
  getLastResponseElement,
  getLastResponse,
  getTextareaValue,
  setTextarea,
  send,
  onSend,
  waitForIdle,
};

export default chatgpt;
