const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         bard-page-translate-button
// @description  🍓 let Bard translate the web page you are reading in one click
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @require      https://cdn.jsdelivr.net/npm/@mozilla/readability@0.4.3/Readability.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bard.google.com
// @license      MIT
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_addValueChangeListener
`;

const i18n = `
// @name:en      Bard Page Translate Button
// @description:en 🍓 let Bard translate the web page you are reading in one click
// @name:zh-CN   Bard 页面翻译按钮
// @description:zh-CN 🍓 让 Bard 一键翻译您正在阅读的网页
// @name:es      Botón de traducción de página de Bard
// @description:es 🍓 permite que Bard traduzca la página web que estás leyendo con un solo clic
// @name:hi      Bard पृष्ठ अनुवाद बटन
// @description:hi 🍓 Bard को वेबपेज जो आप पढ़ रहे हैं को एक क्लिक में अनुवाद करने दें
// @name:ar      زر ترجمة الصفحة لـ Bard
// @description:ar 🍓 دع Bard يترجم صفحة الويب التي تقرأها بنقرة واحدة
// @name:pt      Botão de tradução de página do Bard
// @description:pt 🍓 permita que o Bard traduza a página da web que você está lendo com um clique
// @name:ru      Кнопка перевода страницы Bard
// @description:ru 🍓 позволяет Bard переводить веб-страницу, которую вы читаете, одним щелчком мыши
// @name:ja      Bardページ翻訳ボタン
// @description:ja 🍓 Bardで読んでいるWebページをワンクリックで翻訳
// @name:de      Bard-Seitenübersetzungs-Button
// @description:de 🍓 Lassen Sie Bard die Webseite, die Sie gerade lesen, mit einem Klick übersetzen
// @name:fr      Bouton de traduction de page Bard
// @description:fr 🍓 laissez Bard traduire la page Web que vous lisez en un seul clic
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
