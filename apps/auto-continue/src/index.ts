import { getContinueGeneratingButton, getRegenerateButton, getTextarea, isGenerating } from 'chatkit/chatgpt';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  let firstTime = true;
  setInterval(async () => {
    while (true) {
      const waitTime = (!document.hasFocus()) ? 5 * 1000 : 2000;
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
      break;
    }
  }, 1000);
}

(function () {
  main();
}());
