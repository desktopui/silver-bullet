const w = window as any;

const electronPolyfill = {
  ipcRenderer: {
    on: function() {},
    send: function() {}
  }
};
export const electron =
  w && w.require ? w.require("electron") : electronPolyfill;
const { ipcRenderer } = electron;

export function sendEventToMain(event: string, ...args: any[]) {
  ipcRenderer.send(event, ...args);
}
