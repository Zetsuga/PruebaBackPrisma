import { Prisma } from "@prisma/client";
import { FastifyRequest } from "fastify";

export type postDAO = {
    id?:number,
    id_user?:number,
    title:string,
    content:string,
    datetime:string
}

export interface PostRequest extends FastifyRequest{
    body: Prisma.postUserCreateInput
}