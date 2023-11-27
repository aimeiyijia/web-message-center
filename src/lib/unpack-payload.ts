import { prefix, packagePayload } from ".";

import type { MessageCenterPayload, MessageCenterSubscriberArg } from ".";

export function unpackPayload(e: MessageEvent): MessageCenterPayload | false {
  let payload: MessageCenterPayload;

  if (e.data.slice(0, prefix.length) !== prefix) {
    return false;
  }

  try {
    payload = JSON.parse(e.data.slice(prefix.length));
  } catch (err) {
    return false;
  }

  if (payload.reply) {
    const replyOrigin = e.origin;
    const replySource = e.source as Window;
    const replyEvent = payload.reply as string;

    payload.reply = function reply(replyData: unknown): void {
      if (!replySource) {
        return;
      }

      const replyPayload = packagePayload(
        replyEvent,
        replyOrigin,
        replyData as MessageCenterSubscriberArg
      );

      if (!replyPayload) {
        return;
      }

      replySource.postMessage(replyPayload, replyOrigin);
    };
  }
  return payload;
}
