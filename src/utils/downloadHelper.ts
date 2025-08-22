import { saveAs } from 'file-saver';

export const downloadJSON = (content: string, filename: string = 'formatted.json') => {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  saveAs(blob, filename);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  }
};