import { isntString } from ".";

import type { MessageCenterOnHandler } from ".";

export function subscriptionArgsInvalid(
  event: string,
  fn: MessageCenterOnHandler,
  origin: string
): boolean {
  if (isntString(event)) {
    return true;
  }
  if (typeof fn !== "function") {
    return true;
  }

  return isntString(origin);
}
