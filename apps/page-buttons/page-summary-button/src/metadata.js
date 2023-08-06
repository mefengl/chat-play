import { fileURLToPath } from 'url';
function generateUpdateURL() {
    let filePath = fileURLToPath(import.meta.url).split('/apps/')[1].split('/src')[0];
    return `https://github.com/mefengl/chat-scripts/raw/main/${filePath}/script.user.js`;
}

const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt-page-summary-button
// @description  🍓 let ChatGPT summary the web page you are reading in one click
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @require      https://cdn.jsdelivr.net/npm/@mozilla/readability@0.4.3/Readability.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_addValueChangeListener
// @updateURL    ${generateUpdateURL()}
`;

const i18n = `
// @name:en      ChatGPT Page Summary Button
// @description:en 🍓 let ChatGPT summarize the web page you are reading in one click
// @name:zh-CN   ChatGPT 页面摘要按钮
// @description:zh-CN 🍓 让 ChatGPT 一键总结您正在阅读的网页
// @name:es      Botón de resumen de página de ChatGPT
// @description:es 🍓 permite que ChatGPT resuma la página web que estás leyendo con un solo clic
// @name:hi      ChatGPT पृष्ठ सारांश बटन
// @description:hi 🍓 ChatGPT को वेबपेज जो आप पढ़ रहे हैं को एक क्लिक में संक्षेप में देने दें
// @name:ar      زر ملخص الصفحة لـ ChatGPT
// @description:ar 🍓 دع ChatGPT يلخص صفحة الويب التي تقرأها بنقرة واحدة
// @name:pt      Botão de resumo de página do ChatGPT
// @description:pt 🍓 permita que o ChatGPT resuma a página da web que você está lendo com um clique
// @name:ru      Кнопка резюме страницы ChatGPT
// @description:ru 🍓 позволяет ChatGPT кратко описывать веб-страницу, которую вы читаете, одним щелчком мыши
// @name:ja      ChatGPTページ要約ボタン
// @description:ja 🍓 ChatGPTで読んでいるWebページをワンクリックで要約
// @name:de      ChatGPT-Seitenzusammenfassungs-Button
// @description:de 🍓 Lassen Sie ChatGPT die Webseite, die Sie gerade lesen, mit einem Klick zusammenfassen
// @name:fr      Bouton de résumé de page ChatGPT
// @description:fr 🍓 laissez ChatGPT résumer la page Web que vous lisez en un seul clic
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
