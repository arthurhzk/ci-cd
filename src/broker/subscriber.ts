import { registerNotification } from "./channel/register-notification.ts";

registerNotification.consume(
  "register-notification",
  async (message) => {
    if (!message) {
      return null;
    }

    console.log(message?.content.toString());

    registerNotification.ack(message);
  },
  {
    noAck: false,
  }
);
