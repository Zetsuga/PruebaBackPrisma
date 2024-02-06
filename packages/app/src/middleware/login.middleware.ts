import { LoginRequest, userDAO } from "../interface/login.interface";
import { PrismaClient } from '@prisma/client';
import { FastifyReply } from "fastify";
const prisma = new PrismaClient()

export const checkEmail = async(request: LoginRequest, reply: FastifyReply, done:any): Promise<void> => {
    try{
        const { email } = request.body
        const dataUser: userDAO = await prisma.users.findUnique({
            where:{
                email : email
            }
        })
        if(dataUser){
            reply.code(405).send('Duplicate user');
        }
    }catch(error: any){        
        reply.code(400).send('Not possible to save user')
    }
}