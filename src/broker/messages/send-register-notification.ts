import { registerNotification } from "../channel/register-notification.ts";

export const dispatchOrderCreated = (data: { email: string; name: string }) => {
  registerNotification.sendToQueue(
    "register-notification",
    Buffer.from(JSON.stringify(data))
  );
};
