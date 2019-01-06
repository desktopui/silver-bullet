export const electron = (window as any).require("electron");
const { ipcRenderer } = electron;

export function sendEventToMain(event: string, ...args: any[]) {
  ipcRenderer.send(event, ...args);
}
