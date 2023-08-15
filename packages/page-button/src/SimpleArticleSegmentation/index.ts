const MIN_PARAGRAPH_LENGTH: number = 3200;
const MAX_PARAGRAPH_LENGTH: number = 3600;
const TOKEN_LETTER_TO_CHARACTER_RATIO: number = 0.6;

export class SimpleArticleSegmentation {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  containsAsianCharacters(str: string): boolean {
    const regex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Script=Hangul}]/gu;
    return regex.test(str);
  }

  segment(): string[] {
    const paragraphs: string[] = [];

    if (this.containsAsianCharacters(this.text)) {
      let i = 0;
      const maxParagraphLength = Math.floor(MAX_PARAGRAPH_LENGTH * TOKEN_LETTER_TO_CHARACTER_RATIO);
      while (i < this.text.length) {
        const paragraph = this.text.substring(i, i + maxParagraphLength);
        paragraphs.push(paragraph);
        i += maxParagraphLength;
      }
    } else {
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

      if (paragraph.length > 0) {
        paragraphs.push(paragraph);
      }
    }

    return paragraphs;
  }
}
