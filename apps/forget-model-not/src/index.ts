import { getNewModelSelectButtons, hasNewModelSelectButtons } from 'chatkit/chatgpt'

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

const useLocalStorage = (key: string, defaultValue: string) => {
  const ref = {
    get value() {
      const value = localStorage.getItem(key) || defaultValue;
      return Number(value);
    },
    set value(value) {
      localStorage.setItem(key, value.toString());
    }
  };
  return ref;
}

interface MenuAll {
  always_gpt4: boolean;
}

async function main() {
  await initialize();

  const default_menu_all: MenuAll = {
    always_gpt4: false,
  };

  const menu_all: MenuAll = { ...default_menu_all, ...GM_getValue("menu_all", {}) };
  const menu_id: { [key: string]: number } = GM_getValue("menu_id", {});

  function toggleSetting(name: keyof MenuAll) {
    menu_all[name] = !menu_all[name];
    GM_setValue("menu_all", menu_all);
  }

  function updateMenuCommand(name: keyof MenuAll, description: string, needReload = false) {
    if (menu_id[name]) GM_unregisterMenuCommand(menu_id[name]);
    menu_id[name] = GM_registerMenuCommand(description + (menu_all[name] ? "✅" : "❌"), () => {
      toggleSetting(name);
      update_menu();
      if (needReload) location.reload();
    });
  }

  function update_menu() {
    updateMenuCommand("always_gpt4", "Always GPT4: ", true);

    GM_setValue("menu_id", menu_id);
  }
  update_menu();

  const defaultModelIndex = useLocalStorage('defaultModelIndex', '1');

  getNewModelSelectButtons().forEach((button, index) =>
    button.addEventListener('click', () => {
      defaultModelIndex.value = index;
      console.log(`defaultModelIndex: ${defaultModelIndex.value}`);
    })
  );

  setInterval(async () => {
    hasNewModelSelectButtons() &&
      getNewModelSelectButtons()[
        menu_all.always_gpt4 ? 1 : defaultModelIndex.value
      ].click();
  }, 1000);
}

(function () {
  main();
})();
