import { isHorizontalConversation, setHorizontalConversation } from 'chatkit/chatgpt';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();

  const checkAndUpdateConversation = () => {
    if (!isHorizontalConversation()) {
      setHorizontalConversation();
    }
  };

  // Listen to URL changes using popstate event
  window.addEventListener('popstate', checkAndUpdateConversation);

  // Observe changes in the body element to detect navigation
  const observer = new MutationObserver(checkAndUpdateConversation);
  observer.observe(document.body, { childList: true, subtree: true });
}

(function () {
  main();
}());
