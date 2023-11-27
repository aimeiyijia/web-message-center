import { MessageCenter } from "./message-center"
import { generateUUID } from "../utils/uuid"

import type { MessageCenterSubscriberArg, MessageCenterSubscribeHandler } from "."

export function subscribeReplier(
  fn: MessageCenterSubscribeHandler,
  origin: string
): string {
  const uuid = generateUUID()

  function replier(
    data: MessageCenterSubscriberArg,
    replyOriginHandler: MessageCenterSubscribeHandler
  ): void {
    fn(data, replyOriginHandler)
    MessageCenter.target({
      origin
    }).off(uuid, replier)
  }

  MessageCenter.target({
    origin
  }).on(uuid, replier)

  return uuid
}
