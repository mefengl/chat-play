import { getContinueGeneratingButton } from 'chatkit/chatgpt'

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  setInterval(async () => {
    const continueGeneratingButton = getContinueGeneratingButton();
    if (continueGeneratingButton) {
      continueGeneratingButton.click();
    }
  }, 1000);
}

(function () {
  main();
}());
