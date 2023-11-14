export function getFieldset() {
  const fieldsets = document.querySelectorAll('fieldset');
  return fieldsets[fieldsets.length - 1];
}

export function getTextarea() {
  const fieldset = getFieldset();
  if (!fieldset) return;
  return fieldset.querySelector('p');
};

export function setTextarea(message: string) {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.textContent = message;
}

export function getSubmitButton() {
  const fieldset = getFieldset();
  return fieldset.querySelector('button');
};

export function getPromptElementHTMLs() {
  return Array.from(document.querySelectorAll('.ReactMarkdown.place-self-end > .contents')).map(m => m.innerHTML);
}

export function getResponseElementHTMLs() {
  return Array.from(document.querySelectorAll('.ReactMarkdown.place-self-start > .contents')).map(m => m.innerHTML);
}

export function isGenerating() {
  return getSubmitButton()?.hasAttribute('disabled');
}

export async function send(message: string) {
  setTextarea(message);
  const textarea = getTextarea();
  if (!textarea) return;
  while (textarea.textContent === message) {
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

export function setPromptListener(key: string = 'prompt_texts') {
  let last_trigger_time = +new Date();
  if (location.href.includes("claude.ai")) {
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
            if (firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
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
