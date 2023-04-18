function getTextarea() {
  const form = document.querySelector('form');
  if (!form) return;
  const textareas = form.querySelectorAll('textarea');
  const result = textareas[0];
  return result;
};

function getSubmitButton() {
  const textarea = getTextarea();
  if (!textarea) return;
  return textarea.nextElementSibling;
};

function getRegenerateButton() {
  const form = document.querySelector('form');
  if (!form) return;
  const buttons = form.querySelectorAll('button');
  const result = Array.from(buttons).find(button => button.textContent?.trim().toLowerCase().includes('regenerate'));
  return result;
};

function getStopGeneratingButton() {
  const form = document.querySelector('form');
  if (!form) return;
  const buttons = form.querySelectorAll('button');
  const result = Array.from(buttons).find(button => button.textContent?.trim().toLowerCase().includes('stop generating'));
  return result;
};

function getLastResponseElement() {
  const responseElements = document.querySelectorAll('.group.w-full');
  return responseElements[responseElements.length - 1];
};

function getLastResponse() {
  const lastResponseElement = getLastResponseElement();
  if (!lastResponseElement) return;
  const lastResponse = lastResponseElement.textContent;
  return lastResponse;
};

function getTextareaValue() {
  return getTextarea()?.value || '';
}

function setTextarea(message: string) {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.value = message;
  textarea.dispatchEvent(new Event('input'));
}

function send(message: string) {
  setTextarea(message);
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
}

function regenerate() {
  const regenerateButton = getRegenerateButton();
  if (!regenerateButton) return;
  regenerateButton.click();
}

function onSend(callback: () => void) {
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

function isGenerating() {
  return getSubmitButton()?.firstElementChild?.childElementCount === 3;
}

function waitForIdle() {
  return new Promise<void>(resolve => {
    const interval = setInterval(() => {
      if (!isGenerating()) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

declare function GM_setValue(name: string, value: any): void;
declare function GM_addValueChangeListener(
  name: string,
  listener: (name: string, oldValue: any, newValue: any, remote: boolean) => void
): number;

function setListener(key: string = "prompt_texts") {
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
          // get prompt_texts from local
          let firstTime = true;
          while (prompt_texts.length > 0) {
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
            if (!firstTime && chatgpt.isGenerating()) { continue; }
            firstTime = false;
            const prompt_text = prompt_texts.shift() || '';
            // submit
            chatgpt.send(prompt_text);
          }
        }
      }, 0);
      GM_setValue(key, []);
    });
  }
}

function getConversation(): HTMLElement | undefined {
  return document.querySelector('div[class^="react-scroll-to-bottom"]')?.firstChild?.firstChild as HTMLElement;
}

function getModelSelectButton(): HTMLElement | undefined {
  const conversation = getConversation();
  if (!conversation) return;
  return Array.from(conversation.querySelectorAll('button'))
    .find(button => button.textContent?.trim().toLowerCase().includes('model'));
}

function isConversationStarted() {
  return !getModelSelectButton();
}

function setPureConversation() {
  const conversation = getConversation();
  if (!conversation) return;
  const firstChild = conversation.firstChild;
  if (!firstChild) return;
  const newDiv = document.createElement('div');
  conversation.insertBefore(newDiv, firstChild.nextSibling);
}

function isHorizontalConversation() {
  const conversation = getConversation();
  if (!conversation) return true;
  if (!isConversationStarted()) return true;
  return conversation.classList.contains("grid");
}

function setHorizontalConversation() {
  if (isHorizontalConversation()) return;
  setPureConversation();
  const conversation = getConversation();
  if (!conversation) return;
  conversation.classList.remove("flex", "flex-col", "items-center");
  conversation.classList.add("grid", "grid-cols-2", "place-items-center");
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
  regenerate,
  onSend,
  isGenerating,
  waitForIdle,
  setListener,
  getConversation,
  getModelSelectButton,
  isConversationStarted,
  setPureConversation,
  isHorizontalConversation,
  setHorizontalConversation,
};

export default chatgpt;
