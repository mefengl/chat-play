import { waitForIdle, getLastResponseElement, regenerate } from 'chatkit/chatgpt';

async function initialize(): Promise<void> {
  await new Promise<void>(resolve => window.addEventListener('load', resolve));
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
}

async function main(): Promise<void> {
  await initialize();
  while (true) {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    const lastResponseElement = getLastResponseElement();
    if (!lastResponseElement) { continue; }

    // Check if lastResponseElement has only one child
    if (lastResponseElement.childElementCount === 1) {
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      await waitForIdle();
      // Duplicate the child
      const duplicatedChild = lastResponseElement.children[0].cloneNode(true) as HTMLElement;
      lastResponseElement.appendChild(duplicatedChild);

      // Regenerate the response
      regenerate();
    }
  }
}

(async function () {
  await main();
})();
