declare global {
  // for some reason, the Window constructor does not exist on the window object :/
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Window {
    Window: () => Window;
  }
}

type ReplyFunction = (...args: unknown[]) => void;

export type MessageCenterPayload = {
  data?: string | ReplyFunction;
  event: string;
  origin: string;
  reply?: string | ReplyFunction;
  eventData?: MessageCenterSubscriberArg | MessageCenterReplyHandler;
};
export type MessageCenterSubscriberArg = Record<string, unknown>;
export type MessageCenterSubscribeHandler = (
  data?: MessageCenterSubscriberArg | MessageCenterSubscribeHandler,
  reply?: MessageCenterSubscribeHandler
) => void;
type MessageCenterSubscription = Record<string, MessageCenterSubscribeHandler[]>;
export type MessageCenterSubscriber = Record<string, MessageCenterSubscription>;

export type MessageCenterReplyHandler = (data: unknown) => void;
export type MessageCenterOnHandler = (
  data: MessageCenterSubscriberArg,
  reply: MessageCenterReplyHandler
) => void;
