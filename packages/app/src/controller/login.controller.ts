import { LoginRequest } from '../interface/login.interface'
import { PrismaClient } from '@prisma/client';
import { FastifyReply} from 'fastify'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_KEY?process.env.JWT_KEY:'';
const prisma = new PrismaClient()

export const loginUser = async(request:LoginRequest, reply:FastifyReply) => {
    try{
        const {email, pass} = request.body
        const userData = await prisma.users.findUnique({
            where:{
                email : email,
            }
        })
        if(userData){
            const compare = await bcrypt.compare(pass, userData.pass);
            if(compare){
                const jwtKey = jwt.sign({
                    id:userData.id
                  }, secretKey, { expiresIn: '24h' });
                reply.code(200).send(jwtKey)
            }
        }
        reply.code(405).send('Incorrect credentials')
    }catch(error : any){
        reply.code(400).send('Error on login')
    }
}


export const createUser = async(request: LoginRequest , reply:FastifyReply) => {
    try {
        let {name,lastName,address,email,pass} : any  = request.body
        const role : string = 'user'
        pass = await bcrypt.hashSync(pass, 10);
        const dataUser : any = await prisma.users.create({
            data:{
                name,
                lastName,
                address,
                email,
                pass,
                role
            },
        })
        if (dataUser) {
            reply.code(200).send('User created')
        }
        reply.code(405).send('User not created')
    } catch (error : any) {        
        reply.code(400).send('The operation can\' t be resolve')
    }
}