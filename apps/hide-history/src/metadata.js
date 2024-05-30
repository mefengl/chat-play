const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         chatgpt-hide-history
// @description  🙈 Seletively hide chat history in sidebar such as "Today", "Yesterday", "Previous 7 Days", etc.
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license      MIT
// @match        https://chatgpt.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
`;

const i18n = `
// @name:en      chatgpt-hide-history
// @description:en 🙈 Seletively hide chat history in sidebar such as "Today", "Yesterday", "Previous 7 Days", etc.
// @name:zh-CN   chatgpt-隐藏聊天历史
// @description:zh-CN 🙈 选择性地隐藏边栏中的聊天历史，如 "今天"，"昨天"，"前7天" 等等.
// @name:es      ocultar-historial-chatgpt
// @description:es 🙈 Ocultar selectivamente el historial de chat en la barra lateral como "Hoy", "Ayer", "Últimos 7 días", etc.
// @name:hi      चैटगप्ट-इतिहास-छुपाएं
// @description:hi 🙈 "आज", "कल", "पिछले 7 दिन" आदि के रूप में साइडबार में चैट इतिहास को चयनतः छिपाएं.
// @name:ar      إخفاء-تاريخ-الدردشة-gpt
// @description:ar 🙈 إخفاء تاريخ الدردشة بشكل انتقائي في الشريط الجانبي مثل "اليوم"، "أمس"، "السابق 7 أيام"، الخ.
// @name:pt      ocultar-histórico-chatgpt
// @description:pt 🙈 Ocultar seletivamente o histórico de chat na barra lateral como "Hoje", "Ontem", "Últimos 7 dias", etc.
// @name:ru      скрыть-историю-чата-gpt
// @description:ru 🙈 Выборочно скрыть историю чата в боковой панели, такую как "Сегодня", "Вчера", "Предыдущие 7 дней" и т.д.
// @name:ja      chatgpt-履歴を隠す
// @description:ja 🙈 サイドバーのチャット履歴を選択的に非表示にする、例えば "今日"、"昨日"、"過去7日間" など.
// @name:de      chatgpt-Verlauf-verbergen
// @description:de 🙈 Wählen Sie aus, welche Chatverläufe in der Seitenleiste ausgeblendet werden sollen, wie zum Beispiel "Heute", "Gestern", "Letzte 7 Tage", usw.
// @name:fr      cacher-historique-chatgpt
// @description:fr 🙈 Masquer sélectivement l'historique des discussions dans la barre latérale comme "Aujourd'hui", "Hier", "Les 7 derniers jours", etc.
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
