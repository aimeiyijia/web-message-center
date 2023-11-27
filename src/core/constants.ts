import type { MessageCenterSubscriber } from ".";

export const prefix = "/*framebus*/";
export const childWindows: Window[] = [];
export const subscribers: MessageCenterSubscriber = {};
