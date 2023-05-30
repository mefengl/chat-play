const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt-page-anki-button
// @description  🍓 let ChatGPT create Anki cards from the web page you are reading in one click
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
`;

const i18n = `
// @name:en      ChatGPT Page Anki Button
// @description:en 🍓 let ChatGPT create Anki cards from the web page you are reading in one click
// @name:zh-CN   ChatGPT 页面 Anki 按钮
// @description:zh-CN 🍓 让 ChatGPT 一键从您正在阅读的网页创建 Anki 卡片
// @name:es      Botón Anki de página de ChatGPT
// @description:es 🍓 permite que ChatGPT cree tarjetas Anki de la página web que estás leyendo con un solo clic
// @name:hi      ChatGPT पृष्ठ Anki बटन
// @description:hi 🍓 ChatGPT को वेबपेज जो आप पढ़ रहे हैं से Anki कार्ड बनाने दें
// @name:ar      زر Anki لصفحة ChatGPT
// @description:ar 🍓 دع ChatGPT ينشئ بطاقات Anki من صفحة الويب التي تقرأها بنقرة واحدة
// @name:pt      Botão Anki de página do ChatGPT
// @description:pt 🍓 permita que o ChatGPT crie cartões Anki da página da web que você está lendo com um clique
// @name:ru      Кнопка Anki для страницы ChatGPT
// @description:ru 🍓 позволяет ChatGPT создать карты Anki с веб-страницы, которую вы читаете, одним щелчком мыши
// @name:ja      ChatGPTページAnkiボタン
// @description:ja 🍓 ChatGPTで読んでいるWebページをワンクリックでAnkiカードを作成
// @name:de      ChatGPT-Seiten-Anki-Knopf
// @description:de 🍓 Lassen Sie ChatGPT Anki-Karten von der Webseite, die Sie gerade lesen, mit einem Klick erstellen
// @name:fr      Bouton Anki de page ChatGPT
// @description:fr 🍓 laissez ChatGPT créer des cartes Anki de la page Web que vous lisez en un seul clic
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
