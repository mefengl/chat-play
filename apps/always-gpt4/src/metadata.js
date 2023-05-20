const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         ChatGPT Always GPT-4 ✨
// @description  🔄 Automatically select the 'GPT-4' mode when it appears in ChatGPT!
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        https://chat.openai.com/*
// @grant        none
`;

const i18n = `
// @name:en      ChatGPT Always GPT-4 ✨
// @description:en 🔄 Automatically select the 'GPT-4' mode when it appears in ChatGPT!
// @name:zh-CN   ChatGPT 总是选择 GPT-4 ✨
// @description:zh-CN 🔄 当 GPT-4 模式在 ChatGPT 中出现时，自动选择！
// @name:es      ChatGPT Siempre GPT-4 ✨
// @description:es 🔄 ¡Selecciona automáticamente el modo 'GPT-4' cuando aparece en ChatGPT!
// @name:hi      ChatGPT हमेशा GPT-4 ✨
// @description:hi 🔄 ChatGPT में 'GPT-4' मोड के दिखने पर स्वचालित रूप से चुनें!
// @name:ar      ChatGPT دائماً GPT-4 ✨
// @description:ar 🔄 حدد وضع 'GPT-4' تلقائياً عندما يظهر في ChatGPT!
// @name:pt      ChatGPT Sempre GPT-4 ✨
// @description:pt 🔄 Selecione automaticamente o modo 'GPT-4' quando ele aparecer no ChatGPT!
// @name:ru      ChatGPT Всегда GPT-4 ✨
// @description:ru 🔄 Автоматически выбирает режим 'GPT-4', когда он появляется в ChatGPT!
// @name:ja      ChatGPT いつも GPT-4 ✨
// @description:ja 🔄 ChatGPTで'GPT-4'モードが表示されたら、自動的に選択します！
// @name:de      ChatGPT Immer GPT-4 ✨
// @description:de 🔄 Wählen Sie automatisch den 'GPT-4' Modus aus, wenn er in ChatGPT erscheint!
// @name:fr      ChatGPT Toujours GPT-4 ✨
// @description:fr 🔄 Sélectionnez automatiquement le mode 'GPT-4' lorsqu'il apparaît dans ChatGPT!
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
