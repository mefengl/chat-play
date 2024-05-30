const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         ChatGPT Forget-Model-Not 🌺
// @description  See you again~
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        https://chatgpt.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
`;

const i18n = `
// @name:en      ChatGPT Forget-Model-Not 🌺
// @description:en See you again~
// @name:zh-CN   ChatGPT 勿忘模型 🌺
// @description:zh-CN 再见~
// @name:es      ChatGPT Olvida-Modelo-No 🌺
// @description:es Hasta luego~
// @name:hi      ChatGPT मॉडल-न-भूलो 🌺
// @description:hi फिर मिलेंगे~
// @name:ar      ChatGPT نموذج-لا-تنسى 🌺
// @description:ar أراك لاحقا~
// @name:pt      ChatGPT Esquece-Modelo-Não 🌺
// @description:pt Até mais~
// @name:ru      ChatGPT Не Забывай Модель 🌺
// @description:ru Увидимся~
// @name:ja      ChatGPT モデル忘れずに 🌺
// @description:ja またね~
// @name:de      ChatGPT Vergiss-Modell-Nicht 🌺
// @description:de Bis dann~
// @name:fr      ChatGPT N'oubliez pas le modèle 🌺
// @description:fr À bientôt~
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
