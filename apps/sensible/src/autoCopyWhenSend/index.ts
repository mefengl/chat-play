import onSend from "../onSend";
import ChatGPT from 'chatgpt'

const chatgpt = new ChatGPT();

export default function autoCopyWhenSend() {
  onSend(() => {
    navigator.clipboard.writeText(chatgpt.getChatInput());
  });
}
