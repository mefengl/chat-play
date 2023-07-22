export function getTextarea() {
  const fieldset = document.querySelector('fieldset');
  if (!fieldset) return;
  return fieldset.querySelector('p');
};

export function setTextarea(message: string) {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.textContent = message;
}

export function getSubmitButton() {
  return document.querySelector('[aria-label="Send Message"]');
};

export async function send(message: string) {
  setTextarea(message);
  const textarea = getTextarea();
  if (!textarea) return;
  while (textarea.textContent === message) {
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

export function isGenerating() {
  return getSubmitButton()?.hasAttribute('disabled');
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
            const waitTime = (isLong && !document.hasFocus()) ? 30 * 1000 : 2000;
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, waitTime)); }
            if (!firstTime && isGenerating()) {
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
