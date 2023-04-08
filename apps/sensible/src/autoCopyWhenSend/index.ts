import onSend from "../onSend";
import { chatgpt } from "chatkit";

export default function autoCopyWhenSend() {
  onSend(() => {
    navigator.clipboard.writeText(chatgpt.getTextareaValue());
  });
}
