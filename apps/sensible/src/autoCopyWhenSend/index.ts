import { getTextareaValue, onSend } from "@mefengl/chatkit/chatgpt";

export default function autoCopyWhenSend() {
  onSend(() => {
    navigator.clipboard.writeText(getTextareaValue());
  });
}
