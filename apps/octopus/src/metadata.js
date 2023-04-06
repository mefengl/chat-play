const metadata = `
// ==UserScript==
// @name         chat-octopus
// @namespace    https://github.com/mefengl
// @version      0.2.8
// @description  let octopus send message for you
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @author       mefengl
// @match        https://chat.openai.com/*
// @match        https://bard.google.com/*
// @match        https://www.bing.com/search*q=Bing+AI*
// @require      https://cdn.staticfile.org/jquery/3.6.1/jquery.min.js
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @license MIT
// ==/UserScript==
`;

export default metadata;
