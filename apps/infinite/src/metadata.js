const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt-infinite
// @namespace    https://github.com/mefengl
// @version      0.3.6
// @description  Infinite auto ask for chatgpt
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @author       mefengl
// @match        https://chat.openai.com/*
// @grant        none
// @license      MIT
`;

const i18n = `
// @name:en      ChatGPT Infinite
// @description:en Infinite auto ask for chatgpt
// @name:zh-CN   ChatGPT无限
// @description:zh-CN 无限自动询问ChatGPT
// @name:es      ChatGPT Infinito
// @description:es Preguntas automáticas infinitas para chatgpt
// @name:hi      चैटजीपीटी अनंत
// @description:hi चैटजीपीटी के लिए अनंत स्वचालित पूछताछ
// @name:ar      ChatGPT لانهائي
// @description:ar طلب تلقائي لا نهائي لـ chatgpt
// @name:pt      ChatGPT Infinito
// @description:pt Perguntas automáticas infinitas para chatgpt
// @name:ru      ChatGPT Бесконечный
// @description:ru Бесконечный автоматический запрос для chatgpt
// @name:ja      ChatGPTインフィニティ
// @description:ja ChatGPTの無限自動質問
// @name:de      ChatGPT Unendlich
// @description:de Unendliches automatisches Fragen für ChatGPT
// @name:fr      ChatGPT Infini
// @description:fr Questions automatiques infinies pour chatgpt
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
