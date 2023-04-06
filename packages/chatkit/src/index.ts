import chatgpt from "./chatgpt";
import bard from "./bard";
import bingchat from "./bingchat";

const chatkit = (url: string) => {
  if (url.includes("chat.openai")) {
    return chatgpt;
  }
  if (url.includes("bard.google")) {
    return bard;
  }
  if (url.includes("Bing+AI")) {
    return bingchat;
  }
}

export default chatkit;

export {
  chatgpt,
  bard,
  bingchat
};
