const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         ChatGPT Forget-Model-Not 🌺
// @description  🔄 Automatically select the last model used when it appears in ChatGPT!
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        https://chat.openai.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
`;

const i18n = `
// @name:en      ChatGPT Forget-Model-Not 🌺
// @description:en 🔄 Automatically select the last model used when it appears in ChatGPT!
// @name:zh-CN   ChatGPT 勿忘模型 🌺
// @description:zh-CN 🔄 当上次使用的模型在 ChatGPT 中出现时，自动选择！
// @name:es      ChatGPT Olvida-Modelo-No 🌺
// @description:es 🔄 ¡Selecciona automáticamente el último modelo utilizado cuando aparece en ChatGPT!
// @name:hi      ChatGPT मॉडल-न-भूलो 🌺
// @description:hi 🔄 ChatGPT में पिछले मॉडल का उपयोग करने के दिखने पर स्वचालित रूप से चुनें!
// @name:ar      ChatGPT نموذج-لا-تنسى 🌺
// @description:ar 🔄 حدد النموذج الأخير المستخدم تلقائياً عندما يظهر في ChatGPT!
// @name:pt      ChatGPT Esquece-Modelo-Não 🌺
// @description:pt 🔄 Selecione automaticamente o último modelo usado quando ele aparecer no ChatGPT!
// @name:ru      ChatGPT Не Забывай Модель 🌺
// @description:ru 🔄 Автоматически выбирает последнюю использованную модель, когда она появляется в ChatGPT!
// @name:ja      ChatGPT モデル忘れずに 🌺
// @description:ja 🔄 ChatGPTで最後に使用したモデルが表示されたら、自動的に選択します！
// @name:de      ChatGPT Vergiss-Modell-Nicht 🌺
// @description:de 🔄 Wählen Sie automatisch das zuletzt verwendete Modell aus, wenn es in ChatGPT erscheint!
// @name:fr      ChatGPT N'oubliez pas le modèle 🌺
// @description:fr 🔄 Sélectionnez automatiquement le dernier modèle utilisé lorsqu'il apparaît dans ChatGPT!
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
