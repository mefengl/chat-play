import { chatgpt, bard, bing } from "@mefengl/chatkit"

(function () {
  'use strict';

  const default_menu_all = {
  };
  const menu_all = GM_getValue("menu_all", default_menu_all);
  // 菜单更新的逻辑
  const menus = [
    { checker: () => location.href.includes("chat.openai"), name: "openai", value: true },
    { checker: () => location.href.includes("bard.google"), name: "bard", value: true },
    { checker: () => location.href.includes("Bing+AI"), name: "bing", value: true },
  ];

  menus.forEach(menu => {
    $(() => menu.checker() && GM_setValue(menu.name, true));
    if (GM_getValue(menu.name) == true) {
      default_menu_all[menu.name] = menu.value;
    }
  });

  // 检查是否有新增菜单
  for (let name in default_menu_all) {
    if (!(name in menu_all)) {
      menu_all[name] = default_menu_all[name];
    }
  }
  const menu_id = GM_getValue("menu_id", {});

  function registerMenuCommand(name, value) {
    const menuText = ` ${name}：${value ? '✅' : '❌'}`;
    const commandCallback = () => {
      menu_all[name] = !menu_all[name];
      GM_setValue('menu_all', menu_all);
      update_menu();
      location.reload();
    };
    return GM_registerMenuCommand(menuText, commandCallback);
  }
  function update_menu() {
    for (let name in menu_all) {
      const value = menu_all[name];
      if (menu_id[name]) {
        GM_unregisterMenuCommand(menu_id[name]);
      }
      menu_id[name] = registerMenuCommand(name, value);
    }
    GM_setValue('menu_id', menu_id);
  }
  update_menu();

  /* ************************************************************************* */
  // ChatGPT send prompt to other ai
  let chatgpt_last_prompt = '';
  $(() => {
    if (menu_all.openai && location.href.includes("chat.openai")) {
      chatgpt.onSend(() => {
        const textarea = chatgpt.getTextarea();
        if (!textarea) { return; }
        const prompt = textarea.value;
        chatgpt_last_prompt = prompt;
        GM_setValue('bard_prompt_texts', [prompt]);
        GM_setValue('bing_prompt_texts', [prompt]);
      });
    }
  });
  // ChatGPT response to prompt comes from other ai
  let last_trigger_time = +new Date();
  $(() => {
    if (location.href.includes("chat.openai")) {
      GM_addValueChangeListener("chatgpt_prompt_texts", (name, old_value, new_value) => {
        if (+new Date() - last_trigger_time < 500) {
          return;
        }
        last_trigger_time = + new Date();
        setTimeout(async () => {
          const prompt_texts = new_value;
          if (prompt_texts.length > 0) {
            // get prompt_texts from local
            let firstTime = true;
            while (prompt_texts.length > 0) {
              if (!firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
              if (!firstTime && chatgpt.getRegenerateButton() == undefined) { continue; }
              firstTime = false;
              const prompt_text = prompt_texts.shift();
              if (prompt_text === chatgpt_last_prompt) { continue; }
              chatgpt.send(prompt_text);
            }
          }
        }, 0);
        GM_setValue("chatgpt_prompt_texts", []);
      });
    }
  });

  /* ************************************************************************* */
  // Bard send prompt to other ai
  let bard_last_prompt = "";
  $(async () => {
    if (menu_all.bard && location.href.includes("bard.google")) {
      while (!bard.getSubmitButton()) { await new Promise(resolve => setTimeout(resolve, 500)); }
      bard.onSend(() => {
        const textarea = bard.getTextarea();
        if (!textarea) { return; }
        let prompt = textarea.value;
        if (!prompt) {
          prompt = bard.getLatestPromptText();
        }
        bard_last_prompt = prompt;
        GM_setValue('chatgpt_prompt_texts', [prompt]);
        GM_setValue('bing_prompt_texts', [prompt]);
      });
    }
  });
  // Bard response to prompt_texts
  let lastTriggerTime = +new Date();
  if (location.href.includes("bard.google")) {
    GM_addValueChangeListener("bard_prompt_texts", (name, old_value, new_value) => {
      if (+new Date() - lastTriggerTime < 500) {
        return;
      }
      lastTriggerTime = + new Date();
      setTimeout(async () => {
        const promptTexts = new_value;
        if (promptTexts.length > 0) {
          // get promptTexts from local
          let firstTime = true;
          while (promptTexts.length > 0) {
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
            if (!firstTime && bard.getRegenerateButton() == undefined) { continue; }
            firstTime = false;
            const promptText = promptTexts.shift();
            if (promptText === bard_last_prompt) { continue; }
            bard.send(promptText);
          }
        }
      }, 0);
      GM_setValue("bard_prompt_texts", []);
    });
  }
  /* ************************************************************************* */
  // bing send prompt to other ai
  let bing_last_prompt = "";
  $(async () => {
    if (menu_all.bing && location.href.includes("Bing+AI")) {
      while (!bing.getSubmitButton()) { await new Promise(resolve => setTimeout(resolve, 500)); }
      bing.onSend(() => {
        const textarea = bing.getTextarea();
        if (!textarea) { return; }
        const prompt = textarea.value;
        bing_last_prompt = prompt;
        GM_setValue('chatgpt_prompt_texts', [prompt]);
        GM_setValue('bard_prompt_texts', [prompt]);
      });
    }
  });
  // bing response to prompt_texts
  let last_trigger_time_bing = +new Date();
  if (location.href.includes("Bing+AI")) {
    GM_addValueChangeListener("bing_prompt_texts", (name, old_value, new_value) => {
      if (+new Date() - last_trigger_time_bing < 500) {
        return;
      }
      last_trigger_time_bing = + new Date();
      setTimeout(async () => {
        const prompt_texts = new_value;
        if (prompt_texts.length > 0) {
          // get prompt_texts from local
          let firstTime = true;
          while (prompt_texts.length > 0) {
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
            if (!firstTime && bing.getStopGeneratingButton() != undefined) { continue; }
            firstTime = false;
            const prompt_text = prompt_texts.shift();
            if (prompt_text === bing_last_prompt) { continue; }
            bing.send(prompt_text);
          }
        }
      }, 0);
      GM_setValue("bing_prompt_texts", []);
    });
  }
})();
