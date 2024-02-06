import { FastifyRequest } from 'fastify';
import { Prisma }  from '@prisma/client';

export interface LoginRequest extends FastifyRequest{
    body: Prisma.usersCreateInput
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

export interface loginHistoricalDAO{
    id:number,
    email:string,
    sucess:boolean,
    datetime:Date
}