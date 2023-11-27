import { subscribers } from ".";

import type { MessageCenterSubscriberArg, MessageCenterSubscribeHandler } from ".";

export function dispatch(
  origin: string,
  event: string,
  data?: MessageCenterSubscriberArg,
  reply?: MessageCenterSubscribeHandler,
  e?: MessageEvent
): void {
  if (!subscribers[origin]) {
    return;
  }
  if (!subscribers[origin][event]) {
    return;
  }

  const args: [
    (MessageCenterSubscriberArg | MessageCenterSubscribeHandler)?,
    MessageCenterSubscribeHandler?
  ] = [];

  if (data) {
    args.push(data as MessageCenterSubscriberArg);
  }

  if (reply) {
    args.push(reply as MessageCenterSubscribeHandler);
  }

  for (let i = 0; i < subscribers[origin][event].length; i++) {
    subscribers[origin][event][i].apply(e, args);
  }
}
