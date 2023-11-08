import { getContinueGeneratingButton, getRegenerateButton, getTextarea, isGenerating } from 'chatkit/chatgpt';

let retryCount = 0;
const maxRetries = 3;
let lastRetryTime: number | null = null;

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  let firstTime = true;
  setInterval(async () => {
    const currentTime = new Date().getTime();
    if (lastRetryTime && (currentTime - lastRetryTime >= 5 * 60 * 1000)) {
      retryCount = 0;
    }

    while (true) {
      const waitTime = (!document.hasFocus()) ? 20 * 1000 : 2000;
      if (!firstTime) { await new Promise(resolve => setTimeout(resolve, waitTime)); }
      if (!firstTime && isGenerating()) {
        continue;
      } else if (getContinueGeneratingButton()) {
        getContinueGeneratingButton()?.click();
        continue;
      } else if (getRegenerateButton() && !getTextarea()) {
        // If has regenerate button without textarea, often means network error
        // in this case, retry is safe.
        // But Openai's other error handling is not safe to retry, so we limit it to 3 retries in 5 minute.
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2 * 1000));
          getRegenerateButton()?.click();
          retryCount++;
          lastRetryTime = new Date().getTime();
          continue;
        } else {
          console.error('Failed to regenerate after 3 attempts. Stopping retries.');
          break;
        }
      }
      firstTime = false;
      break;
    }
  }, 1000);
}

(function () {
  main();
}());
