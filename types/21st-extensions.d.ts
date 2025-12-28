declare module '@21st-extension/extension-toolbar-srpc-contract' {
  export const DEFAULT_PORT: any;
  export const PING_ENDPOINT: any;
  export const PING_RESPONSE: any;
  export const contract: any;
  export const EventName: any;
  export function getExtensionBridge(...args: any[]): any;
  export function getToolbarBridge(...args: any[]): any;
  export type VSCodeContext = any;
  export type PromptRequest = any;
}

declare module '@21st-extension/srpc' {
  export const createSRPCClientBridge: any;
  export const createSRPCServerBridge: any;
  export type SRPC = any;
}
