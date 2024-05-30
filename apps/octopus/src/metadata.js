const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chat-octopus
// @namespace    https://github.com/mefengl
// @version      ${process.env.npm_package_version}
// @description  🐙 let octopus send multiple messages for you
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @author       mefengl
// @match        https://chatgpt.com/*
// @match        https://bard.google.com/*
// @match        https://www.bing.com/search?q=Bing+AI*
// @require      https://cdn.staticfile.org/jquery/3.6.1/jquery.min.js
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @license      MIT
`;

const i18n = `
// @name:en      Chat Octopus
// @description:en 🐙 let octopus send multiple messages for you
// @name:zh-CN   聊天章鱼
// @description:zh-CN 🐙 让章鱼为您发送多条信息
// @name:es      Chat Pulpo
// @description:es 🐙 deja que el pulpo envíe múltiples mensajes por ti
// @name:hi      चैट ऑक्टोपस
// @description:hi 🐙 आपके लिए कई संदेश भेजने के लिए ऑक्टोपस की अनुमति दें
// @name:ar      أخطبوط الدردشة
// @description:ar 🐙 دع الأخطبوط يرسل رسائل متعددة نيابة عنك
// @name:pt      Chat Polvo
// @description:pt 🐙 deixe o polvo enviar várias mensagens para você
// @name:ru      Чат-осьминог
// @description:ru 🐙 позвольте осьминогу отправлять несколько сообщений за вас
// @name:ja      チャットオクトパス
// @description:ja 🐙 タコがあなたに代わって複数のメッセージを送る
// @name:de      Chat-Oktopus
// @description:de 🐙 Lassen Sie den Oktopus mehrere Nachrichten für Sie senden
// @name:fr      Chat Poulpe
// @description:fr 🐙 laissez la pieuvre envoyer plusieurs messages pour vous
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
