# chatgpt-page-translate-button

A userscript that adds a "Translate to Chinese" button on any webpage. When clicked, it sends the text from the webpage to ChatGPT for translation and then displays the translated text on the ChatGPT web interface.

## Installation

1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
2. Click [chatgpt-page-translate-button](https://greasyfork.org/scripts/464067) to the greasyfork page to install the userscript.
3. Visit any website, and you will see a "Translate to Chinese" button at the topright corner of the page.

## Usage

When you visit a webpage with the userscript installed, you'll see a "Translate to Chinese" button at the topright corner of the page. Click the button to send the text from the webpage to ChatGPT for translation. The translated text will be displayed on the ChatGPT web interface.

## Code structure

- `main.ts`: The main script that initializes the translation process and creates the translate button.
- `createButton.ts`: A helper module that creates the "Translate to Chinese" button and adds it to the webpage.
- `getParagraphs.ts`: A helper module that extracts paragraphs from the webpage.
- `chatkit.ts`: A module that handles the communication with the ChatGPT API.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve this userscript.

## Credits

- [Mozilla Readability](https://github.com/mozilla/readability): uses it to extract content from webpages, license: [LICENSES/mozilla-readability.md](LICENSES/mozilla-readability.md)

## License

This project is licensed under the MIT License.

Respository link: [chat-play/apps/page-translate-button](https://github.com/mefengl/chat-play)

Build code repository link: https://github.com/mefengl/chatgpt-page-translate-button (this repo only contains the built code for greasyfork to automatically update the script)
