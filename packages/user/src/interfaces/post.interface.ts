import { FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";

export type postDAO = {
    id?:number,
    id_user?:number,
    title?:string,
    content?:string,
    datetime?:string
}

export interface PostRequest extends FastifyRequest{
    body: Prisma.usersCreateInput
}

export type postWithoutIdDAO = {
    title?:string,
    content?:string,
    datetime?:Date
}