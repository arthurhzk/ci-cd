import Fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { AuthController } from "../controllers/auth.ts";

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

app.post("/register", AuthController.prototype.register);
app.post("/login", AuthController.prototype.login);

app.listen({ host: "0.0.0.0", port: 3334 }).then(() => {
  console.log("[Authentication] HTTP Server running!");
});
