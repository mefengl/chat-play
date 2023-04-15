const MIN_PARAGRAPH_LENGTH: number = 1600;
const MAX_PARAGRAPH_LENGTH: number = 1800;

class SimpleArticleSegmentation {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  segment(): string[] {
    const paragraphs: string[] = [];
    const sentences: string[] = this.text.split(/(?<=[.!?])\s+/);
    let paragraph: string = '';

    for (const sentence of sentences) {
      if ((paragraph.length + sentence.length + 1) <= MAX_PARAGRAPH_LENGTH) {
        paragraph += (paragraph.length > 0 ? ' ' : '') + sentence;
      } else {
        if (paragraph.length >= MIN_PARAGRAPH_LENGTH) {
          paragraphs.push(paragraph);
          paragraph = sentence;
        } else {
          paragraph += ' ' + sentence;
        }
      }
    }

    if (paragraph.length >= MIN_PARAGRAPH_LENGTH) {
      paragraphs.push(paragraph);
    }

    return paragraphs;
  }
}

export default SimpleArticleSegmentation;
