import { getTextareaValue, onSend } from "chatkit/chatgpt";

export default function autoCopyWhenSend() {
  onSend(() => {
    navigator.clipboard.writeText(getTextareaValue());
  });
}
