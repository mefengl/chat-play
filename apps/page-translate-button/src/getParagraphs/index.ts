import SimpleArticleSegmentation from "../SimpleArticleSegmentation";

function getParagraphs() {
  try {
    let docClone: Document = document.cloneNode(true) as Document;
    let article: Readability.Article | null = new Readability(docClone).parse();
    if (article && article.textContent) {
      const segmenter: SimpleArticleSegmentation = new SimpleArticleSegmentation(article.textContent);
      const paragraphs: string[] = segmenter.segment();
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

export default getParagraphs;
