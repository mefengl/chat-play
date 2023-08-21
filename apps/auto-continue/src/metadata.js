const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         ChatGPT Auto-Continue 🔄
// @description  ⚡ Automatically click the 'Continue Generating' button in ChatGPT, handling errors!
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        https://chat.openai.com/*
// @grant        none
`;

const i18n = `
// @name:en      ChatGPT Auto-Continue 🔄
// @description:en ⚡ Automatically click the 'Continue Generating' button in ChatGPT, handling errors!
// @name:zh-CN   ChatGPT 自动继续 🔄
// @description:zh-CN ⚡ 自动点击ChatGPT中的“继续生成”按钮，处理错误！
// @name:es      ChatGPT Auto-Continuar 🔄
// @description:es ⚡ ¡Haz clic automáticamente en el botón 'Continuar generando' en ChatGPT, manejando errores!
// @name:hi      ChatGPT स्वचालित जारी रखें 🔄
// @description:hi ⚡ ChatGPT में 'जारी रखने' बटन पर स्वचालित रूप से क्लिक करें, त्रुटियों को संभालते हुए!
// @name:ar      ChatGPT التكميل الآلي 🔄
// @description:ar ⚡ انقر تلقائيًا على زر 'متابعة التوليد' في ChatGPT ، معالجة الأخطاء!
// @name:pt      ChatGPT Auto-Continuar 🔄
// @description:pt ⚡ Clique automaticamente no botão 'Continuar Gerando' no ChatGPT, tratando erros!
// @name:ru      ChatGPT Авто-Продолжение 🔄
// @description:ru ⚡ Автоматически нажимайте на кнопку "Продолжить генерацию" в ChatGPT, обрабатывая ошибки!
// @name:ja      ChatGPT 自動続行 🔄
// @description:ja ⚡ ChatGPTの「続けて生成」ボタンを自動的にクリックし、エラーを処理します！
// @name:de      ChatGPT Auto-Fortsetzen 🔄
// @description:de ⚡ Klicken Sie automatisch auf die Schaltfläche "Generierung fortsetzen" in ChatGPT, Fehler behandeln!
// @name:fr      ChatGPT Auto-Continuer 🔄
// @description:fr ⚡ Cliquez automatiquement sur le bouton 'Continuer à générer' dans ChatGPT, gérer les erreurs!
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
