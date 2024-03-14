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

function getNewSubmitButton() {
  return document.querySelector('button[data-testid="send-button"]') as HTMLButtonElement | undefined;
}

export function getSubmitButton() {
  if (getNewSubmitButton()) {
    return getNewSubmitButton();
  }
  const textarea = getTextarea();
  if (!textarea) return;
  return textarea.nextElementSibling as HTMLButtonElement | undefined;
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

function getNewStopGeneratingButton() {
  return document.querySelector('button[aria-label="Stop generating"]');
}

export function getStopGeneratingButton() {
  return getNewStopGeneratingButton() || getButton('stop');
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
  for (let i = 0; i < 5 && textarea.value === message; i++) {
    getSubmitButton()?.click();
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  for (let i = 0; i < 10; i++) {
    if (isGenerating()) {
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
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
  if (getNewStopGeneratingButton()) {
    return true;
  }
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

export async function sendArray(messages: string[]) {
  let firstTime = true;
  const isLong = messages.length > 60;
  let stop = false;
  while (messages.length > 0 || stop) {
    stop = false;
    const waitTime = (isLong && !document.hasFocus()) ? 20 * 1000 : 2000;
    if (!firstTime) { await new Promise(resolve => setTimeout(resolve, waitTime)); }
    firstTime = false;
    if (isGenerating()) {
      continue;
    } else if (getContinueGeneratingButton()) {
      getContinueGeneratingButton()?.click();
      stop = true;
      continue;
    } else if (getRegenerateButton() && !getTextarea()) {
      await new Promise(resolve => setTimeout(resolve, 10 * 1000));
      getRegenerateButton()?.click();
      stop = true;
      continue;
    }
    if (messages.length === 0) {
      break;
    }
    await send(messages.shift() || '');
  }
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
        sendArray(new_value);
        GM_setValue(key, []);
      }, 0);
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
