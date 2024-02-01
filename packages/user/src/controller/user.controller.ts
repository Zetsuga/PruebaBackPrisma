import { FastifyReply, FastifyRequest } from "fastify"
import { UserRequest, userDAO } from "../interfaces/user.interface";
import { deleteSensitiveData } from "../utilities/user.utilities";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const  getAllUser = async (request:FastifyRequest,reply:FastifyReply) =>{
    try {
        const dataUser:any= await prisma.users.findMany()
        reply.code(200).send(await deleteSensitiveData(dataUser))
    } catch (err:any) {
        reply.code(400).send([]);
    }
}

export const getUserById = async(request:FastifyRequest, reply: FastifyReply) => {
    try {        
        const id : any= request.params;
        const dataUser: any = await prisma.users.findUnique({
            where:{id:id.id}
        })
        console.log(dataUser);
        
        reply.code(200).send(await deleteSensitiveData(dataUser))
    } catch (error:any) {
        reply.code(400).send([]);
    }
}

export const createUser = async(request: FastifyRequest , reply:FastifyReply) => {
    try {
        const {id,name} : any  = request.body as UserRequest
        const dataUser : any = await prisma.users.create({
            data:{
                id,
                name
            },
        })
        reply.code(200).send(await deleteSensitiveData(dataUser))
    } catch (error : any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}

export const updateUser =async (request: FastifyRequest , reply:FastifyReply) => {
    try {
        let {id,name} : any  = request.body as UserRequest

        id = request.params;
        console.log(id,name);
        
        const dataUser : any = await prisma.users.update({
            data:{
                name:name
            },
            where:{
                id:id.id
            }  
        })
        console.log(dataUser)
        reply.code(200).send('Updated suscessfully')
    } catch (error:any) {
        console.log(error)
        reply.code(400).send('The operation can\' t be resolve')
    }
}

export const deleteUser = async(request: FastifyRequest,reply:FastifyReply) => {
    try {
        const id : any= request.params;        
        const dataUser : any = await prisma.users.delete({
            where:{
                id:id.id
            }
        })        
        reply.code(200).send('Deleted suscessfully')
    } catch (error : any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}