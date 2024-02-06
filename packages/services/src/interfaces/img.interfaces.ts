import { FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";

export interface UserRequest extends FastifyRequest{
    body: Prisma.usersCreateInput,
    authUser: number
}

export interface imgDao{
    id_user?:number,
    id_img?:string
}

export interface userDAO {
    name?: string,
    lastName?: string,
    address?: string,
    id:number,
    email?:string,
    pass?:string,
    role?:string
}