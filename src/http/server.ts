import Fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import { fastifyCors } from "@fastify/cors";
import "../broker/subscriber.ts";

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });

app.get("/health", (req: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ status: "OK" });
});

app.listen({ host: "0.0.0.0", port: 3380 }).then(() => {
  console.log("[Notification] HTTP Server running!");
});
