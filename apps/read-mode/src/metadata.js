import { fileURLToPath } from 'url';
function generateUpdateURL() {
    let filePath = fileURLToPath(import.meta.url).split('/apps/')[1].split('/src')[0];
    return `https://github.com/mefengl/chat-scripts/raw/main/${filePath}/script.user.js`;
}

const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt-read-mode
// @description  🍞 show a modal for Read, also support Claude
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @require      https://cdn.jsdelivr.net/npm/@mozilla/readability@0.4.3/Readability.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        https://chatgpt.com/*
// @grant        GM_registerMenuCommand
// @updateURL    ${generateUpdateURL()}
`;

const i18n = `
// @name:en      ChatGPT Read Mode
// @description:en 🍞 Show a modal for Read
// @name:zh-CN   ChatGPT 阅读模式
// @description:zh-CN 🍞 显示一个用于阅读的模态框
// @name:es      Modo de lectura de ChatGPT
// @description:es 🍞 Mostrar un modal para Leer
// @name:hi      ChatGPT पढ़ने का मोड
// @description:hi 🍞 पढ़ने के लिए एक मोडल दिखाएं
// @name:ar      وضع القراءة لـ ChatGPT
// @description:ar 🍞 عرض نموذج للقراءة
// @name:pt      Modo de leitura do ChatGPT
// @description:pt 🍞 Mostre um modal para Leitura
// @name:ru      Режим чтения ChatGPT
// @description:ru 🍞 Показать модальное окно для чтения
// @name:ja      ChatGPTの読み取りモード
// @description:ja 🍞 閲覧用のモーダルを表示する
// @name:de      ChatGPT-Lesemodus
// @description:de 🍞 Zeigen Sie ein Modal für Lesen an
// @name:fr      Mode de lecture ChatGPT
// @description:fr 🍞 Afficher une fenêtre modale pour la lecture
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
