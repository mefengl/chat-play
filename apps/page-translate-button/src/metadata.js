const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt-page-translate-button
// @description  🍓 let ChatGPT translate the web page you are reading in one click
// @author       mefengl
// @version      0.3.0
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
// @name:en      ChatGPT Page Translate Button
// @description:en 🍓 let ChatGPT translate the web page you are reading in one click
// @name:zh-CN   ChatGPT 页面翻译按钮
// @description:zh-CN 🍓 让 ChatGPT 一键翻译您正在阅读的网页
// @name:es      Botón de traducción de página de ChatGPT
// @description:es 🍓 permite que ChatGPT traduzca la página web que estás leyendo con un solo clic
// @name:hi      ChatGPT पृष्ठ अनुवाद बटन
// @description:hi 🍓 ChatGPT को वेबपेज जो आप पढ़ रहे हैं को एक क्लिक में अनुवाद करने दें
// @name:ar      زر ترجمة الصفحة لـ ChatGPT
// @description:ar 🍓 دع ChatGPT يترجم صفحة الويب التي تقرأها بنقرة واحدة
// @name:pt      Botão de tradução de página do ChatGPT
// @description:pt 🍓 permita que o ChatGPT traduza a página da web que você está lendo com um clique
// @name:ru      Кнопка перевода страницы ChatGPT
// @description:ru 🍓 позволяет ChatGPT переводить веб-страницу, которую вы читаете, одним щелчком мыши
// @name:ja      ChatGPTページ翻訳ボタン
// @description:ja 🍓 ChatGPTで読んでいるWebページをワンクリックで翻訳
// @name:de      ChatGPT-Seitenübersetzungs-Button
// @description:de 🍓 Lassen Sie ChatGPT die Webseite, die Sie gerade lesen, mit einem Klick übersetzen
// @name:fr      Bouton de traduction de page ChatGPT
// @description:fr 🍓 laissez ChatGPT traduire la page Web que vous lisez en un seul clic
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
