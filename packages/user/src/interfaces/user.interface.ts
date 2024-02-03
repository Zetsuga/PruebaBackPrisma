import { FastifyRequest } from 'fastify';
import { Prisma } from '@prisma/client';

export type userDAO ={
    id?:number,
    name:string
}

export interface UserRequest extends FastifyRequest {
    body: Prisma.usersCreateInput
}
