import { chatgpt } from "chatkit";

function setListener(key: string = "prompt_texts") {
  let last_trigger_time = +new Date();
  if (location.href.includes("chat.openai")) {
    GM_addValueChangeListener(key, (name, old_value, new_value) => {
      if (+new Date() - last_trigger_time < 500) {
        return;
      }
      last_trigger_time = +new Date();
      setTimeout(async () => {
        const prompt_texts = new_value;
        if (prompt_texts.length > 0) {
          // get prompt_texts from local
          let firstTime = true;
          while (prompt_texts.length > 0) {
            if (!firstTime) { await new Promise(resolve => setTimeout(resolve, 2000)); }
            if (!firstTime && chatgpt.isGenerating()) { continue; }
            firstTime = false;
            const prompt_text = prompt_texts.shift();
            // submit
            chatgpt.send(prompt_text);
          }
        }
      }, 0);
      GM_setValue(key, []);
    });
  }
}

export default setListener;
