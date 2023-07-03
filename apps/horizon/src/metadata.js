const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt-horizon
// @description  Horizontal the conversation in ChatGPT
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @require
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        https://chat.openai.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
`;

const i18n = `
// @name:en      chatgpt-horizon
// @description:en Horizontal the conversation in ChatGPT
// @name:zh-CN   chatgpt-水平
// @description:zh-CN 使ChatGPT对话水平显示
// @name:es      chatgpt-horizonte
// @description:es Hacer horizontal la conversación en ChatGPT
// @name:hi      chatgpt-क्षैतिज
// @description:hi ChatGPT में संवाद को क्षैतिज करें
// @name:ar      chatgpt-أفقي
// @description:ar جعل المحادثة أفقية في ChatGPT
// @name:pt      chatgpt-horizonte
// @description:pt Tornar a conversa horizontal no ChatGPT
// @name:ru      chatgpt-горизонт
// @description:ru Сделать разговор горизонтальным в ChatGPT
// @name:ja      chatgpt-ホリゾン
// @description:ja ChatGPTでの会話を水平にする
// @name:de      chatgpt-horizont
// @description:de Den Dialog in ChatGPT horizontal gestalten
// @name:fr      chatgpt-horizon
// @description:fr Rendre la conversation horizontale dans ChatGPT
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
