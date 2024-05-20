import { showToastify } from "@/hooks/showToastify";

export const copyTextToClipboard = (value: string) => {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = value;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  showToastify({
    label: "Texto copiado para a área de transferência!",
    type: "success",
  });
};
