const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt sensible
// @namespace    https://github.com/mefengl
// @version      0.6.0
// @description  sensible to me
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @author       mefengl
// @match        https://chat.openai.com/*
// @grant        none
`;

const i18n = `
// @name:en      ChatGPT Sensible
// @description:en Sensible to me
// @name:zh-CN   聊天GPT明智
// @description:zh-CN 对我来说明智
// @name:es      ChatGPT Sensato
// @description:es Sensato para mí
// @name:hi      चैटजीपीटी संवेदनशील
// @description:hi मेरे लिए संवेदनशील
// @name:ar      ChatGPT حساس
// @description:ar حساس بالنسبة لي
// @name:pt      ChatGPT Sensato
// @description:pt Sensato para mim
// @name:ru      ChatGPT Разумный
// @description:ru Разумно для меня
// @name:ja      ChatGPTセンシブル
// @description:ja 私にとって感覚的
// @name:de      ChatGPT Sinnvoll
// @description:de Sinnvoll für mich
// @name:fr      ChatGPT Sensible
// @description:fr Sensible pour moi
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
