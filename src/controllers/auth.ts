import type { FastifyRequest, FastifyReply } from "fastify";
import { PrismaAuthService } from "../services/prisma-auth-service.ts";
import { StatusCodes } from "http-status-codes";
import createError from "@fastify/error";

const InvalidRequest = createError(
  "INVALID_REQUEST",
  "Invalid request data",
  StatusCodes.BAD_REQUEST
);

export class AuthController {
  async login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const requiredFields = [email, password];
    if (requiredFields.some((field) => !field)) {
      throw new InvalidRequest();
    }

    const isLoggedIn = await new PrismaAuthService().loginUser(email, password);

    return reply
      .status(StatusCodes.OK)
      .send({ message: "Logged in successfully" });
  }

  async register(req: FastifyRequest, reply: FastifyReply) {
    const { email, name, password, passwordConfirm } = req.body as {
      email: string;
      name: string;
      password: string;
      passwordConfirm: string;
    };

    const requiredFields = [email, name, password, passwordConfirm];
    if (requiredFields.some((field) => !field)) {
      throw new InvalidRequest();
    }

    const userCreated = await new PrismaAuthService().createUser(
      email,
      name,
      password,
      passwordConfirm
    );

    return reply
      .status(StatusCodes.CREATED)
      .send({ message: "User created successfully" });
  }

  async logout(req: FastifyRequest, reply: FastifyReply) {
    return reply
      .status(StatusCodes.OK)
      .send({ message: "Logged out successfully" });
  }
}
