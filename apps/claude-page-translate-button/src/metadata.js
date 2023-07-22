const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         claude-page-translate-button
// @description  🍓 let Claude translate the web page you are reading in one click
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @require      https://cdn.jsdelivr.net/npm/@mozilla/readability@0.4.3/Readability.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @license      MIT
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_addValueChangeListener
`;

const i18n = `
// @name:en      Claude Page Translate Button
// @description:en 🍓 let Claude translate the web page you are reading in one click
// @name:zh-CN   Claude 页面翻译按钮
// @description:zh-CN 🍓 让 Claude 一键翻译您正在阅读的网页
// @name:es      Botón de traducción de página de Claude
// @description:es 🍓 permite que Claude traduzca la página web que estás leyendo con un solo clic
// @name:hi      Claude पृष्ठ अनुवाद बटन
// @description:hi 🍓 Claude को वेबपेज जो आप पढ़ रहे हैं को एक क्लिक में अनुवाद करने दें
// @name:ar      زر ترجمة الصفحة لـ Claude
// @description:ar 🍓 دع Claude يترجم صفحة الويب التي تقرأها بنقرة واحدة
// @name:pt      Botão de tradução de página do Claude
// @description:pt 🍓 permita que o Claude traduza a página da web que você está lendo com um clique
// @name:ru      Кнопка перевода страницы Claude
// @description:ru 🍓 позволяет Claude переводить веб-страницу, которую вы читаете, одним щелчком мыши
// @name:ja      Claudeページ翻訳ボタン
// @description:ja 🍓 Claudeで読んでいるWebページをワンクリックで翻訳
// @name:de      Claude-Seitenübersetzungs-Button
// @description:de 🍓 Lassen Sie Claude die Webseite, die Sie gerade lesen, mit einem Klick übersetzen
// @name:fr      Bouton de traduction de page Claude
// @description:fr 🍓 laissez Claude traduire la page Web que vous lisez en un seul clic
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
