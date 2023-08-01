export function getSparkleResting(): Element | null {
  return document.querySelector("img[src*=sparkle_resting]");
}

export function getSparkleThinking(): Element | null {
  return document.querySelector("img[src*=sparkle_thinking]");
}

export function getSubmitButton(): HTMLElement | null {
  return document.querySelector('button[aria-label="Send message"]');
}

export function getInputArea(): HTMLElement | null {
  return document.querySelector(".input-area");
}

export function getTextarea(): HTMLTextAreaElement | null {
  const inputArea = getInputArea();
  return inputArea ? inputArea.querySelector('textarea') : null;
}

export function setTextarea(message: string) {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.value = message;
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

export function getRegenerateButton(): HTMLElement | null {
  return document.querySelector('button[aria-label="Retry"]');
}

export function getResponseElementHTMLs() {
  return Array.from(document.querySelectorAll(".model-response-text .markdown")).map(m => m.innerHTML);
}

export function getLastPrompt(): Element | null {
  const promptElements = document.querySelectorAll('.query-text');
  const lastPrompt = promptElements[promptElements.length - 1];
  return lastPrompt;
}

export function getLatestPromptText(): string {
  const lastPrompt = getLastPrompt();
  if (!lastPrompt) return "";
  const lastPromptText = lastPrompt.textContent;
  return lastPromptText || "";
}

export function isGenerating() {
  return getSparkleThinking() !== null;
}

export async function send(message: string) {
  setTextarea(message);
  const textarea = getTextarea();
  if (!textarea) return;
  while (textarea.value === message) {
    await new Promise(resolve => setTimeout(resolve, 100));
    getSubmitButton()?.click();
  }

  // ensure the message is sent
  for (let i = 0; i < 10; i++) {
    if (isGenerating()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export function onSend(callback: () => void): void {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      callback();
    }
  });
  const sendButton = getSubmitButton();
  if (!sendButton) return;
  sendButton.addEventListener('mousedown', callback);
}

export function setPromptListener(key: string = 'prompt_texts') {
  let last_trigger_time = +new Date();
  if (location.href.includes("bard.google")) {
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
            }
            firstTime = false;
            await send(prompt_texts.shift() || "");
          }
        }
      }, 0);
      GM_setValue(key, []);
    });
  }
}
