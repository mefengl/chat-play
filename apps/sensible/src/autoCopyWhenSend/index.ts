import onSend from "../onSend";
import chatkit from "chatkit";

export default function autoCopyWhenSend() {
  onSend(() => {
    navigator.clipboard.writeText(chatkit.getTextareaValue());
  });
}
