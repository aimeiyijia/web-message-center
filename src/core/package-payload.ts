import { subscribeReplier, prefix } from ".";

import type {
  MessageCenterPayload,
  MessageCenterSubscriberArg,
  MessageCenterSubscribeHandler,
  MessageCenterReplyHandler
} from "./types";

export function packagePayload(
  event: string,
  origin: string,
  data?: MessageCenterSubscriberArg | MessageCenterReplyHandler,
  reply?: MessageCenterSubscribeHandler
): string {
  let packaged;
  const payload: MessageCenterPayload = {
    event: event,
    origin: origin,
  };

  if (typeof reply === "function") {
    payload.reply = subscribeReplier(reply, origin);
  }

  payload.eventData = data;

  try {
    packaged = prefix + JSON.stringify(payload);
  } catch (e) {
    throw new Error(`Could not stringify event: ${(e as Error).message}`);
  }

  return packaged;
}
