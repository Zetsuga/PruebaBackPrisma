import { LoginRequest } from "../interface/login.interface";
import { PrismaClient } from '@prisma/client';
import { FastifyReply } from "fastify";
const prisma = new PrismaClient()

export const checkEmail = async(request: LoginRequest, reply: FastifyReply, done) => {
    try{
        const { email } = request.body
        const dataUser = await prisma.users.findUnique({
            where:{
                email : email
            }
        })
        console.log(dataUser)
        if(dataUser){
            reply.code(405).send('Duplicate user');
        }
        done();
    }catch(error: any){        
        reply.code(400).send('Not possible to save user')
    }
}