import { Prisma } from "@prisma/client";
import { FastifyRequest } from "fastify";

export interface UserRequest extends FastifyRequest{
    body: Prisma.usersCreateInput,
    authUser: number
}