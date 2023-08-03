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

export function getNav(): HTMLElement | null {
  return document.querySelector('nav');
}

export function getHistoryBlocks(): HTMLElement[] | [] {
  const nav = getNav();
  if (!nav) return [];
  const result = Array.from(nav.querySelectorAll('ol')).map(ol => ol.parentElement as HTMLElement);
  return result;
}

export function getHistoryBlockTitle(historyBlock: HTMLElement): string {
  return historyBlock.querySelector('h3')?.textContent || '';
}

interface HistoryBlock {
  block: HTMLElement;
  title: string;
}

export function getHistoryBlocksWithTitle(): HistoryBlock[] | [] {
  const historyBlocks = getHistoryBlocks();
  const result = historyBlocks.map(historyBlock => ({
    block: historyBlock,
    title: getHistoryBlockTitle(historyBlock),
  }));
  return result;
}

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

export function getInitialButtons() {
  return Array.from(document.querySelectorAll('button[as="button"]'))
    .filter(button => button.querySelectorAll('.truncate').length === 2) as HTMLButtonElement[];
}

export function getFollowUpButtons() {
  return Array.from(document.querySelectorAll('button[as="button"]'))
    .filter(button => button.textContent?.trim().match(/[.!?]$/)) as HTMLButtonElement[];
}

export function clickFollowUpButton(index: number) {
  const followUpButtons = getFollowUpButtons();
  if (followUpButtons.length === 0) return;
  if (index === undefined || index < 0 || index >= followUpButtons.length) {
    index = Math.floor(Math.random() * followUpButtons.length);
  }
  followUpButtons[index].click();
}

export function getButton(text: string) {
  return Array.from(document.querySelectorAll('button[as="button"]'))
    .find(button => button.textContent?.trim().toLowerCase().includes(text)) as HTMLButtonElement | undefined;
}

export function getRegenerateButton() {
  return getButton('regenerate');
};

export function getContinueGeneratingButton() {
  return getButton('continue');
};

export function getStopGeneratingButton() {
  return getButton('stop');
};

export function getResponseElementHTMLs() {
  return Array.from(document.querySelectorAll(".markdown")).map(m => m.innerHTML);
}

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
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

export async function send(message: string) {
  setTextarea(message);
  const textarea = getTextarea();
  if (!textarea) return;
  while (textarea.value === message) {
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 100));
  }
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
        const isLong = prompt_texts.length > 60;
        if (prompt_texts.length > 0) {
          let firstTime = true;
          while (prompt_texts.length > 0) {
            const waitTime = (isLong && !document.hasFocus()) ? 20 * 1000 : 2000;
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, waitTime)); }
            if (!firstTime && isGenerating()) {
              continue;
            } else if (getContinueGeneratingButton()) {
              getContinueGeneratingButton()?.click();
              continue;
            } else if (getRegenerateButton() && !getTextarea()) {
              // If has regenerate button without textarea, often means network error, wait 10 seconds and try again
              await new Promise(resolve => setTimeout(resolve, 10 * 1000));
              getRegenerateButton()?.click();
              continue;
            }
            firstTime = false;
            await send(prompt_texts.shift() || '');
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

export function getNewModelSelectButtons(): HTMLElement[] {
  return Array.from(document.querySelectorAll("[class^='group/button']"))
}

export function hasNewModelSelectButtons(): boolean {
  return getNewModelSelectButtons().length > 0;
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

export function getShareChatButton() {
  return document.querySelector('button[aria-label="Share chat"]');
}

export function getCopyLinkButton() {
  return Array.from(document.querySelectorAll('button[as="button"]'))
    .filter(button => button.textContent?.trim().toLowerCase().includes('copy link'))[0];
}
