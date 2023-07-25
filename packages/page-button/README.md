# monkit

A toolkit provide useful functions for tampermonkey scripts development.

## MenuManger

```js
import { MenuManager } from '@mefengl/monkit';

const defaultMenu = {
  "chat_language": getLocalLanguage() || "Chinese",
};
const menuManager = new MenuManager(defaultMenu);
const chatLanguage = menuManager.getMenuValue("chat_language");
```
