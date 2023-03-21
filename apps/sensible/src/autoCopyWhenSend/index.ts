import onSend from "../onSend";
import chatgpt from '../chatgpt';

export default function autoCopyWhenSend() {
  onSend(() => {
    navigator.clipboard.writeText(chatgpt.getChatInput());
  });
}
