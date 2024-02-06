import { LoginRequest, loginHistoricalDAO, userDAO } from '../interface/login.interface'
import { PrismaClient } from '@prisma/client';
import { FastifyReply} from 'fastify'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_KEY?process.env.JWT_KEY:'';
const prisma = new PrismaClient()

export const loginUser = async(request:LoginRequest, reply:FastifyReply) : Promise<void>=> {
    try{
        const {email, pass} = request.body
        const userData :userDAO= await prisma.users.findUnique({
            where:{
                email : email,
            }
        })
        if(userData){
            const compare :boolean= await bcrypt.compare(pass, userData.pass);
            if(compare){
                const jwtKey : string= jwt.sign({
                    id:userData.id
                  }, secretKey, { expiresIn: '24h' });
                const saveHistory = await saveHistoryLogin(email,true);
                reply.code(200).send(jwtKey)
            }
        }
        const saveHistory : boolean= await saveHistoryLogin(email,false);
        reply.code(405).send('Incorrect credentials')
    }catch(error : any){
        reply.code(400).send('Error on login')
    }
}


export const createUser = async(request: LoginRequest , reply:FastifyReply): Promise<void> => {
    try {
        let {name,lastName,address,email,pass} = request.body
        const role : string = 'user'
        pass = await bcrypt.hashSync(pass, 10);
        const dataUser : userDAO = await prisma.users.create({
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

const saveHistoryLogin = async(email:string,sucess:boolean):Promise<boolean> => {
    try {
        const saveHistory : loginHistoricalDAO = await prisma.loginHistorical.create({
            data:{
                email:email,
                sucess: sucess,
            }
        })
        if(saveHistory){
            return true
        }
        return false
    } catch (err: any) {
        return false;
    }
}