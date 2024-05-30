const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         Doozy
// @namespace    https://github.com/mefengl
// @version      ${process.env.npm_package_version}
// @description  A wonderful day spent with ChatGPT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @author       mefengl
// @match        https://chatgpt.com/*
// @match        http://*/*
// @match        https://*/*
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
// @name:en      Doozy
// @description:en A wonderful day spent with ChatGPT
// @name:zh-CN   奇妙的一天
// @description:zh-CN 与ChatGPT度过的美好时光
// @name:es      Doozy
// @description:es Un día maravilloso pasado con ChatGPT
// @name:hi      धमाकेदार
// @description:hi चैट जीपीटी के साथ बिताए एक अद्भुत दिन
// @name:ar      دوزي
// @description:ar يوم رائع قضيته مع ChatGPT
// @name:pt      Espetacular
// @description:pt Um dia maravilhoso passado com o ChatGPT
// @name:ru      Блестящий
// @description:ru Замечательный день, проведенный с ChatGPT
// @name:ja      ドゥーズィ
// @description:ja ChatGPTと過ごす素晴らしい一日
// @name:de      Doozy
// @description:de Ein wunderbarer Tag mit ChatGPT verbracht
// @name:fr      Doozy
// @description:fr Une journée merveilleuse passée avec ChatGPT
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
