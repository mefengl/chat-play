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

export function getRegenerateButton(): HTMLElement | null {
  return document.querySelector('button[aria-label="Retry"]');
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

export function send(text: string): void {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.value = text;
  textarea.dispatchEvent(new Event('input'));
  const submitButton = getSubmitButton();
  if (!submitButton) return;
  submitButton.click();
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
