interface Menu {
  chat_language: string;
  [key: string]: string | boolean;
}

interface MenuId {
  [key: string]: number;
}

class MenuManager {
  private menu_all: Menu;
  private menu_id: MenuId;

  constructor(private default_menu_all: Menu) {
    this.menu_all = GM_getValue<Menu>("menu_all", this.default_menu_all);

    for (const name in this.default_menu_all) {
      if (!(name in this.menu_all)) {
        this.menu_all[name] = this.default_menu_all[name];
      }
    }

    this.menu_id = GM_getValue<MenuId>("menu_id", {});

    this.update_menu();
  }

  private registerMenuCommand(name: string, value: string | boolean): number {
    if (name === "chat_language") {
      return GM_registerMenuCommand(`${name}：${value}`, () => {
        const language = prompt("Please input the language you want to use", value.toString());
        if (language) {
          this.menu_all[name] = language;
          GM_setValue("menu_all", this.menu_all);
          this.update_menu();
          location.reload();
        }
      });
    }

    const menuText = ` ${name}：${value ? "✅" : "❌"}`;
    const commandCallback = () => {
      this.menu_all[name] = !this.menu_all[name];
      GM_setValue("menu_all", this.menu_all);
      this.update_menu();
      location.reload();
    };

    return GM_registerMenuCommand(menuText, commandCallback);
  }

  private update_menu(): void {
    for (const name in this.menu_all) {
      const value = this.menu_all[name];
      if (this.menu_id[name]) {
        GM_unregisterMenuCommand(this.menu_id[name]);
      }
      this.menu_id[name] = this.registerMenuCommand(name, value);
    }
    GM_setValue("menu_id", this.menu_id);
  }

  public getMenuValue(name: string): string | boolean | undefined {
    return this.menu_all[name];
  }
}

export default MenuManager;
