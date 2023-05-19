const start = '// ==UserScript==';
const end = '// ==/UserScript==';

const base = `
// @name         Midjourney Click All
// @description  Click all the buttons in a row at once when you're in Discord with Midjourney bot open! 😊
// @author       mefengl
// @version      ${process.env.npm_package_version}
// @namespace    https://github.com/mefengl
// @icon         https://www.google.com/s2/favicons?sz=64&domain=midjourney.com
// @license      MIT
// @match        https://discord.com/channels/*
// @grant        none
`;

const i18n = `
// @name:en      Midjourney Click All
// @description:en Click all the buttons in a row at once when you're in Discord with Midjourney bot open! 😊
// @name:zh-CN   Midjourney一键点击
// @description:zh-CN 当你在Discord中打开Midjourney机器人时，一次点击一排的所有按钮！😊
// @name:es      Midjourney Click Todo
// @description:es ¡Haz clic en todos los botones en una fila a la vez cuando estés en Discord con el bot de Midjourney abierto! 😊
// @name:hi      Midjourney सभी पर क्लिक करें
// @description:hi जब आप Discord में Midjourney बॉट के साथ हों, तो एक बार में सभी बटनों पर क्लिक करें! 😊
// @name:ar      Midjourney انقر على الكل
// @description:ar انقر على جميع الأزرار في صف واحد في وقت واحد عندما تكون في Discord مع بوت Midjourney مفتوح! 😊
// @name:pt      Midjourney Clique Tudo
// @description:pt Clique em todos os botões em uma linha de uma vez quando estiver no Discord com o bot Midjourney aberto! 😊
// @name:ru      Midjourney Нажмите на все
// @description:ru Нажмите все кнопки в ряду сразу, когда вы находитесь в Discord с открытым ботом Midjourney! 😊
// @name:ja      Midjourney すべてをクリック
// @description:ja DiscordでMidjourneyボットを開いているときに、一度にすべてのボタンをクリックします！😊
// @name:de      Midjourney Klick Alles
// @description:de Klicken Sie auf alle Tasten in einer Reihe auf einmal, wenn Sie in Discord mit dem geöffneten Midjourney-Bot sind! 😊
// @name:fr      Midjourney Cliquez sur Tout
// @description:fr Cliquez sur tous les boutons d'une rangée à la fois lorsque vous êtes sur Discord avec le bot Midjourney ouvert! 😊
`;

const metadata = `${start}${base}${i18n}${end}`;

export default metadata;
