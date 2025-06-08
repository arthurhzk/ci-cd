import { broker } from "../broker.ts";
export const registerNotification = await broker.createChannel();

await registerNotification.assertQueue("register-notification");
