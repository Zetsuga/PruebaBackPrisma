import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';
import * as JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserRequest } from "../../interfaces/img.interfaces";

dotenv.config()
const prisma = new PrismaClient()
const JWT_key : any = process.env.JWT_KEY?process.env.JWT_KEY:'';


export const checkTokenJWT = async(request: FastifyRequest, reply:FastifyReply, done: any)=>{
    try{
        let tokenJWT: string | undefined = request.headers.authorization
        tokenJWT = tokenJWT?.replace('Bearer ','');
        if (!tokenJWT) {
            return reply.code(402).send('Token not found');
        }

        await new Promise((resolve, reject) => {
            JWT.verify(tokenJWT, JWT_key, (err: any, decoded: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });

    }catch(error : any){
        if (error.name === 'TokenExpiredError') {
            return reply.code(402).send('Token expired');
        } else {
            return reply.code(400).send('Invalid token');
        }
    }
}

export const validateUser = async(request: UserRequest, reply:FastifyReply, done: any)=>{
    try {
        let tokenJWT : string | undefined  = request.headers.authorization?.replace('Bearer ','');

        if (!tokenJWT) {
            return reply.code(402).send('Token not found');
        }

        const user: any = JWT.verify(tokenJWT, JWT_key)

        if(!user.id){
            return reply.code(402).send('Data token not valid')
        }
        
        const userData: any = await prisma.users.findUnique({ where: { id: user.id } })        
        if(!userData){
            return reply.code(402).send('Invalid token')
        }
        
        request.authUser = userData.id;
    } catch (error) {
        return reply.code(400).send('Data token not valid')
    }
}