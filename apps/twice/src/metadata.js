const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt twice
// @namespace    https://github.com/mefengl
// @version      ${process.env.npm_package_version}
// @description  ask question twice!
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @author       mefengl
// @match        https://chat.openai.com/*
// @grant        none
// @license      MIT
`;

const i18n = `
// @name:en      ChatGPT Twice
// @description:en Ask question twice!
// @name:zh-CN   聊天GPT两次
// @description:zh-CN 提问两次！
// @name:es      ChatGPT Dos veces
// @description:es ¡Haz la pregunta dos veces!
// @name:hi      चैटजीपीटी दो बार
// @description:hi सवाल दो बार पूछें!
// @name:ar      ChatGPT مرتين
// @description:ar اطرح السؤال مرتين!
// @name:pt      ChatGPT Duas vezes
// @description:pt Faça a pergunta duas vezes!
// @name:ru      ChatGPT Дважды
// @description:ru Задайте вопрос дважды!
// @name:ja      ChatGPT 2回
// @description:ja 質問を2回行う！
// @name:de      ChatGPT Zweimal
// @description:de Stelle die Frage zweimal!
// @name:fr      ChatGPT Deux fois
// @description:fr Posez la question deux fois !
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
