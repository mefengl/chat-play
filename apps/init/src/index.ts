import { chatgpt } from 'chatkit';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function fetchTextFromUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: (response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.responseText);
        } else {
          reject(new Error(`Failed to load the URL. Status: ${response.status}`));
        }
      },
      onerror: (error) => {
        reject(error);
      },
    });
  });
}

async function main() {
  await initialize();

  try {
    if (chatgpt.isConversationStarted()) { return; }
    const url = 'https://pastebin.com/raw/TR3fNcGa';
    const text = await fetchTextFromUrl(url);
    chatgpt.send(text);
  } catch (error) {
    console.error('Failed to fetch the text:', error);
  }
}

(function () {
  main();
}());
