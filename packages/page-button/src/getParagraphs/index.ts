import { segmentText } from "../segmentText";

export function getParagraphs() {
  try {
    let docClone: Document = document.cloneNode(true) as Document;

    // @ts-expect-error: Cannot find namespace 'Readability'.
    let article: Readability.Article | null = new Readability(docClone).parse();

    if (article?.textContent) {
      const paragraphs: string[] = segmentText(article.textContent);

      // Trim the paragraphs
      for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i] = paragraphs[i].trim();
      }

      return paragraphs;
    } else {
      console.warn("Readability.js could not extract any text content from this page.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while using Readability.js:", error);
    return [];
  }
}
