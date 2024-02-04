import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { formatPostUser } from '../utilities/post.utilities';
import { PostRequest } from '../interfaces/post.interface';
const prisma = new PrismaClient()

export const getPostById =  async(request:FastifyRequest, reply:FastifyReply)=>{
    try {        
        const id : any= request.params;
        const dataPost: any = await prisma.postUser.findUnique({
            where:{id:id.id}
        })
                
        reply.code(200).send(await formatPostUser(dataPost))
    } catch (error:any) {
        reply.code(400).send([]);
    }
}

export const getAllPost =  async(request:FastifyRequest,reply: FastifyReply)=>{    
    try {        
        const dataPost:any= await prisma.postUser.findMany()
        reply.code(200).send(await formatPostUser(dataPost))
    } catch (err:any) {
        reply.code(400).send([]);
    }
}

export const createPost = async(request:FastifyRequest,reply: FastifyReply) => {
    try {
        const {title,content} : any  = request.body as PostRequest
        const id_user : number = 1
        const dataPost : any = await prisma.postUser.create({
            data:{
                id_user,
                title,
                content

            },
        })
        reply.code(200).send(await formatPostUser(dataPost))
    } catch (error: any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}

export const updatePost = async(request:FastifyRequest, reply:FastifyReply) => {
    try {
        let {title,content} : any  = request.body as PostRequest

        const id : any= request.params;        
        const dataPost : any = await prisma.postUser.update({
            data:{
                title:title,
                content:content
            },
            where:{
                id:id.id
            }  
        })
        reply.code(200).send(await formatPostUser(dataPost))
    } catch (error: any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}

export const deletePost = async(request:FastifyRequest, reply:FastifyReply) => {
    try {
        const id : any= request.params;        
        const dataPost : any = await prisma.postUser.delete({
            where:{
                id:id.id
            }
        })        
        reply.code(200).send('Deleted suscessfully')
    } catch (error: any) {
        reply.code(400).send('The operation can\' t be resolve')

    }
}