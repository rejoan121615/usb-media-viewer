// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


import { contextBridge, ipcRenderer } from 'electron';
import { IPCTypes } from './types/main.types';

contextBridge.exposeInMainWorld('storageApi', {
    getVideoTree: () => ipcRenderer.invoke('video-tree' as IPCTypes)
});