import { FastifyRequest } from 'fastify';
import { Prisma }  from '@prisma/client';

export interface LoginRequest extends FastifyRequest{
    body: Prisma.usersCreateInput
}