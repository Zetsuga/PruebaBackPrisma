import { deleteSensitiveData } from "../utils/user.utilities";
import { UserRequest, userDAO } from "../interfaces/user.interface";
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const  getAllUser = async (request:FastifyRequest,reply:FastifyReply) :Promise<void> =>{
    try {
        const dataUser:userDAO[]= await prisma.users.findMany()
        reply.code(200).send(await deleteSensitiveData(dataUser))
    } catch (err:any) {
        reply.code(400).send([]);
    }
}

export const getUserById = async(request:FastifyRequest, reply: FastifyReply) :Promise<void> => {
    try {
        const id : any= request.params;
        
        const dataUser: userDAO = await prisma.users.findUnique({
            where:{id:id.id}
        })                
        reply.code(200).send(await deleteSensitiveData(dataUser))
    } catch (error:any) {
        reply.code(400).send([]);
    }
}

export const getUserProfile = async(request:FastifyRequest, reply: FastifyReply) :Promise<void> => {
    try {
        const id : any= request['authUser'];
        
        const dataUser: userDAO = await prisma.users.findUnique({
            where:{id:id}
        })                
        reply.code(200).send(await deleteSensitiveData(dataUser))
    } catch (error:any) {
        reply.code(400).send([]);
    }
}

export const updateUser =async (request: UserRequest , reply:FastifyReply) :Promise<void> => {
    try {
        const {name,lastName,address} : any  = request.body
        const dataUser : userDAO = await prisma.users.update({
            data:{
                name:name,
                lastName:lastName,
                address:address
            },
            where:{
                id:request['authUser']
            }  
        })
        reply.code(200).send('Updated suscessfully')
    } catch (error:any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}

export const deleteUser = async(request: FastifyRequest,reply:FastifyReply) :Promise<void> => {
    try {
        const dataUser : userDAO = await prisma.users.delete({
            where:{
                id:request['authUser']
            }
        })        
        reply.code(200).send('Deleted suscessfully')
    } catch (error : any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}

export const chageRoleUser = async(request:UserRequest, reply:FastifyReply) :Promise<void> => {
    try {
        const { role } = request.body
        const dataUser: userDAO = await prisma.users.update({
                data:{
                    role: role
                },
                where:{
                    id:request['authUser']
                }
            })
        reply.code(200).send('Update suscessfully')
    } catch (error: any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}