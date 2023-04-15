import { chatgpt } from 'chatkit';
import SimpleArticleSegmentation from './SimpleArticleSegmentation';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  // Wait for the DOM to load before using Readability
  try {
    let docClone: Document = document.cloneNode(true) as Document;
    let article: Readability.Article | null = new Readability(docClone).parse();

    if (article && article.textContent) {
      console.log("Extracted text content using Readability.js:");

      const segmenter: SimpleArticleSegmentation = new SimpleArticleSegmentation(article.textContent);
      const paragraphs: string[] = segmenter.segment();

      console.log("Segmented text content:");
      console.log(paragraphs);

      const prompt_texts: string[] = paragraphs.map((paragraph: string) => {
        return `${paragraph}\ntranslate above paragraph to Chinese:`;
      });
      GM_setValue("prompt_texts", prompt_texts);
    } else {
      console.warn("Readability.js could not extract any text content from this page.");
    }
  } catch (error) {
    console.error("An error occurred while using Readability.js:", error);
  }
  /* ************************************************************************* */
  // ChatGPT response to prompt_texts
  let last_trigger_time = +new Date();
  if (location.href.includes("chat.openai")) {
    GM_addValueChangeListener("prompt_texts", (name, old_value, new_value) => {
      if (+new Date() - last_trigger_time < 500) {
        return;
      }
      last_trigger_time = +new Date();
      setTimeout(async () => {
        const prompt_texts = new_value;
        if (prompt_texts.length > 0) {
          // get prompt_texts from local
          let firstTime = true;
          while (prompt_texts.length > 0) {
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
            if (!firstTime && chatgpt.isGenerating()) { continue; }
            firstTime = false;
            const prompt_text = prompt_texts.shift();
            // submit
            chatgpt.send(prompt_text);
          }
        }
      }, 0);
      GM_setValue("prompt_texts", []);
    });
  }
}

(function () {
  main();
}());
