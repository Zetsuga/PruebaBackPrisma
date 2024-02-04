import { FastifyRequest } from 'fastify';
import { Prisma  } from '@prisma/client';

export type userDAO ={
    id?:number,
    name:string,
    lastName:string,
    address?:string,
    email?:string,
    pass?:string,
    role?:string
}

export interface UserRequest extends FastifyRequest {
    body: Prisma.usersCreateInput
    authUser:number
}
