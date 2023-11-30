import { WebMessageCenter } from "./web-message-center"
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
    WebMessageCenter.target({
      origin
    }).off(uuid, replier)
  }

  WebMessageCenter.target({
    origin
  }).on(uuid, replier)

  return uuid
}
