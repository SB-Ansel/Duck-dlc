//Thank you Dennis Tretyakov! <3
import { IpcRenderer } from 'electron'

declare var __non_webpack_require__: (id: string) => any
const electron = __non_webpack_require__('electron')

console.log('React: appRuntime.ts - Hello Electron!');
export const ipcRenderer: IpcRenderer = electron.ipcRenderer