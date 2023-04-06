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
  const chatgpt = {
    getSubmitButton: function () {
      const form = document.querySelector('form');
      if (!form) return;
      const buttons = form.querySelectorAll('button');
      const result = buttons[buttons.length - 1];
      return result;
    },
    getTextarea: function () {
      const form = document.querySelector('form');
      if (!form) return;
      const textareas = form.querySelectorAll('textarea');
      const result = textareas[0];
      return result;
    },
    getRegenerateButton: function () {
      const form = document.querySelector('form');
      if (!form) return;
      const buttons = form.querySelectorAll('button');
      for (let i = 0; i < buttons.length; i++) {
        const buttonText = buttons[i]?.textContent?.trim().toLowerCase();
        if (buttonText?.includes('regenerate')) {
          return buttons[i];
        }
      }
    },
    getStopGeneratingButton: function () {
      const form = document.querySelector('form');
      if (!form) return;
      const buttons = form.querySelectorAll('button');
      if (buttons.length === 0) return;
      for (let i = 0; i < buttons.length; i++) {
        const buttonText = buttons[i]?.textContent?.trim().toLowerCase();
        if (buttonText?.includes('stop')) {
          return buttons[i];
        }
      }
    },
    send: function (text) {
      const textarea = this.getTextarea();
      if (!textarea) return;
      textarea.value = text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    },
    onSend: function (callback) {
      const textarea = this.getTextarea();
      if (!textarea) return;
      textarea.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          callback();
        }
      });
      const sendButton = this.getSubmitButton();
      if (!sendButton) return;
      sendButton.addEventListener('mousedown', callback);
    },
  };
  // ChatGPT send prompt to other ai
  let chatgpt_last_prompt = '';
  $(() => {
    if (menu_all.openai && location.href.includes("chat.openai")) {
      chatgpt.onSend(() => {
        const textarea = chatgpt.getTextarea();
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
      console.log("chatgpt add value change listener");
      GM_addValueChangeListener("chatgpt_prompt_texts", (name, old_value, new_value) => {
        console.log("prompt_texts changed in chatgpt");
        console.log(new_value);
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
              console.log("chatgpt send prompt_text", prompt_text);
              chatgpt.send(prompt_text);
            }
          }
        }, 0);
        GM_setValue("chatgpt_prompt_texts", []);
      });
    }
  });

  /* ************************************************************************* */
  const bard = {
    getSubmitButton: function () {
      return document.querySelector('button[aria-label="Send message"]');
    },
    getInputArea: function () {
      return document.querySelector(".input-area");
    },
    getTextarea: function () {
      const inputArea = this.getInputArea();
      return inputArea.querySelector('textarea');
    },
    getRegenerateButton: function () {
      return document.querySelector('button[aria-label="Retry"]');
    },
    getLastPrompt: function () {
      const promptElements = document.querySelectorAll('.query-text');
      const lastPrompt = promptElements[promptElements.length - 1];
      return lastPrompt;
    },
    getLatestPromptText: function () {
      const lastPrompt = this.getLastPrompt();
      if (!lastPrompt) return "";
      const lastPromptText = lastPrompt.textContent;
      return lastPromptText;
    },
    send: function (text) {
      const textarea = this.getTextarea();
      textarea.value = text;
      textarea.dispatchEvent(new Event('input'));
      const submitButton = this.getSubmitButton();
      submitButton.click();
    },
    onSend: function (callback) {
      const textarea = this.getTextarea();
      if (!textarea) return;
      textarea.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          callback();
        }
      });
      const sendButton = this.getSubmitButton();
      if (!sendButton) return;
      sendButton.addEventListener('mousedown', callback);
    },
  };
  // Bard send prompt to other ai
  let bard_last_prompt = "";
  $(async () => {
    if (menu_all.bard && location.href.includes("bard.google")) {
      while (!bard.getSubmitButton()) { await new Promise(resolve => setTimeout(resolve, 500)); }
      bard.onSend(() => {
        console.log("bard send");
        const textarea = bard.getTextarea();
        let prompt = textarea.value;
        if (!prompt) {
          prompt = bard.getLatestPromptText();
        }
        console.log(prompt);
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
  const bing = {
    getActionBar: function () {
      return document.querySelector("cib-serp")?.shadowRoot?.querySelector("cib-action-bar")?.shadowRoot;
    },
    getSubmitButton: function () {
      const actionBar = this.getActionBar();
      if (!actionBar) { return null; }
      return actionBar.querySelector('button[aria-label="Submit"]');
    },
    getTextarea: function () {
      const actionBar = this.getActionBar();
      if (!actionBar) { return null; }
      return actionBar.querySelector('textarea');
    },
    getStopGeneratingButton: function () {
      const actionBar = this.getActionBar();
      if (!actionBar) { return null; }
      const stopGeneratingButton = actionBar.querySelector('cib-typing-indicator')?.shadowRoot?.querySelector('button[aria-label="Stop Responding"]');
      if (!stopGeneratingButton) { return null; }
      if (stopGeneratingButton.disabled) { return null; }
      return stopGeneratingButton;
    },
    getNewChatButton: function () {
      const actionBar = this.getActionBar();
      if (!actionBar) { return null; }
      return actionBar.querySelector('button[aria-label="New topic"]');
    },
    getConversation: function () {
      return document.querySelector("cib-serp")?.shadowRoot?.querySelector("cib-conversation")?.shadowRoot;
    },
    getChatTurns: function () {
      const conversation = this.getConversation();
      if (!conversation) { return null; }
      return Array.from(conversation.querySelectorAll('cib-chat-turn')).map(t => t.shadowRoot);
    },
    getLastChatTurn: function () {
      const chatTurns = this.getChatTurns();
      if (!chatTurns) { return null; }
      return chatTurns[chatTurns.length - 1];
    },
    getLastResponse: function () {
      const lastChatTurn = this.getLastChatTurn();
      if (!lastChatTurn) { return null; }
      return lastChatTurn.querySelectorAll('cib-message-group')[1]?.shadowRoot;
    },
    getLastResponseText: function () {
      const lastResponse = this.getLastResponse();
      if (!lastResponse) { return null; }
      return Array.from(lastResponse.querySelectorAll('cib-message'))
        .map(m => m.shadowRoot)
        .find(m => m.querySelector('cib-shared'))
        .textContent.trim();
    },
    send: function (text) {
      const textarea = this.getTextarea();
      if (!textarea) { return null; }
      textarea.value = text;
      textarea.dispatchEvent(new Event('input'));
      const submitButton = this.getSubmitButton();
      if (!submitButton) { return null; }
      submitButton.click();
    },
    onSend: function (callback) {
      const textarea = this.getTextarea();
      if (!textarea) return;
      textarea.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          callback();
        }
      });
      const sendButton = this.getSubmitButton();
      if (!sendButton) return;
      sendButton.addEventListener('mousedown', callback);
    }
  };
  // bing send prompt to other ai
  let bing_last_prompt = "";
  $(async () => {
    if (menu_all.bing && location.href.includes("Bing+AI")) {
      console.log("bing");
      while (!bing.getSubmitButton()) { await new Promise(resolve => setTimeout(resolve, 500)); }
      console.log("get bing submit button");
      bing.onSend(() => {
        console.log("bing send");
        const textarea = bing.getTextarea();
        const prompt = textarea.value;
        console.log(prompt);
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
      last_trigger_time_bing = new Date();
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
            console.log("bing send prompt_text", prompt_text);
            bing.send(prompt_text);
          }
        }
      }, 0);
      GM_setValue("bing_prompt_texts", []);
    });
  }
})();
