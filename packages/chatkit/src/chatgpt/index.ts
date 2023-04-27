/**

Due to possible future code copyright disputes, 
I will put some links below for reference in possible DMCA processes.

At the same time, 
any report on this code will be considered as made after viewing the content of the following links (not all links are included):

https://github.com/mefengl/chatgpt-utils
https://github.com/chatgptjs/chatgpt.js/pull/3
https://github.com/chatgptjs/chatgpt.js/pull/5
https://github.com/chatgptjs/chatgpt.js/pull/9
https://github.com/chatgptjs/chatgpt.js/pull/11
https://github.com/chatgptjs/chatgpt.js/pull/12
https://github.com/chatgptjs/chatgpt.js/pull/13
https://github.com/chatgptjs/chatgpt.js/pull/15
https://github.com/chatgptjs/chatgpt.js/pull/18
https://github.com/chatgptjs/chatgpt.js/pull/19
https://github.com/chatgptjs/chatgpt.js/pull/20
https://github.com/chatgptjs/chatgpt.js/pull/21

This comment will be deleted after the report process is completed.
 */

export function getTextarea() {
  const form = document.querySelector('form');
  if (!form) return;
  const textareas = form.querySelectorAll('textarea');
  const result = textareas[0];
  return result;
};

export function getSubmitButton() {
  const textarea = getTextarea();
  if (!textarea) return;
  return textarea.nextElementSibling;
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

export function regenerate() {
  const regenerateButton = getRegenerateButton();
  if (!regenerateButton) return;
  regenerateButton.click();
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

export function isGenerating() {
  return getSubmitButton()?.firstElementChild?.childElementCount === 3;
}

export function waitForIdle() {
  return new Promise<void>(resolve => {
    const interval = setInterval(() => {
      if (!isGenerating()) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

export function setPromptListener(key: string = 'prompt_texts') {
  let last_trigger_time = +new Date();
  if (location.href.includes("chat.openai")) {
    GM_addValueChangeListener(key, async (name: string, old_value: string[], new_value: string[]) => {
      if (+new Date() - last_trigger_time < 500) {
        return;
      }
      last_trigger_time = +new Date();
      setTimeout(async () => {
        const prompt_texts = new_value;
        if (prompt_texts.length > 0) {
          let firstTime = true;
          while (prompt_texts.length > 0) {
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
            if (!firstTime && isGenerating()) { continue; }
            firstTime = false;
            const prompt_text = prompt_texts.shift() || '';
            send(prompt_text);
          }
        }
      }, 0);
      GM_setValue(key, []);
    });
  }
}

export function getConversation(): HTMLElement | undefined {
  return document.querySelector('div[class^="react-scroll-to-bottom"]')?.firstChild?.firstChild as HTMLElement;
}

export function getModelSelectButton(): HTMLElement | undefined {
  const conversation = getConversation();
  if (!conversation) return;
  return Array.from(conversation.querySelectorAll('button'))
    .find(button => button.textContent?.trim().toLowerCase().includes('model'));
}

export function isConversationStarted() {
  return !getModelSelectButton();
}

export function setPureConversation() {
  const conversation = getConversation();
  if (!conversation) return;
  const firstChild = conversation.firstChild;
  if (!firstChild) return;
  const newDiv = document.createElement('div');
  conversation.insertBefore(newDiv, firstChild.nextSibling);
}

export function isHorizontalConversation() {
  const conversation = getConversation();
  if (!conversation) return true;
  if (!isConversationStarted()) return true;
  return conversation.classList.contains("grid");
}

export function setHorizontalConversation() {
  if (isHorizontalConversation()) return;
  setPureConversation();
  const conversation = getConversation();
  if (!conversation) return;
  conversation.classList.remove("flex", "flex-col", "items-center");
  conversation.classList.add("grid", "grid-cols-2", "place-items-center");
}
