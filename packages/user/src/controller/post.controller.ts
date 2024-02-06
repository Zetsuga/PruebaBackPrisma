import { PostRequest, postDAO } from '../interfaces/post.interface';
import { formatPostUser } from '../utils/post.utilities';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const getPostById =  async(request:FastifyRequest, reply:FastifyReply) : Promise<void> =>{
    try {        
        const id : any= request.params;
        const dataPost: any = await prisma.post.findUnique({
            where:{id:id.id}
        })
                
        reply.code(200).send(await formatPostUser(dataPost))
    } catch (error:any) {
        reply.code(400).send([]);
    }
}

export const getAllPost =  async(request:FastifyRequest,reply: FastifyReply) : Promise<void>=>{    
    try {        
        const dataPost:any= await prisma.post.findMany()
        reply.code(200).send(await formatPostUser(dataPost))
    } catch (err:any) {
        reply.code(400).send([]);
    }
}

export const createPost = async(request:FastifyRequest,reply: FastifyReply) : Promise<void>=> {
    try {
        const {title,content} : any  = request.body as PostRequest
        const dataPost : any = await prisma.post.create({
            data:{
                id_user: request['authUser'],
                title:title,
                content: content

            },
        })
        reply.code(200).send(await formatPostUser(dataPost))
    } catch (error: any) {
        reply.code(400).send('The operation can\' t be resolve')
    }
}

export const updatePost = async(request:FastifyRequest, reply:FastifyReply) : Promise<void> => {
    try {
        let {title,content} : any  = request.body as PostRequest

        const id : any= request.params;        
        const dataPost : any = await prisma.post.update({
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

export const deletePost = async(request:FastifyRequest, reply:FastifyReply) : Promise<void> => {
    try {
        const id : any= request.params;        
        const dataPost : any = await prisma.post.delete({
            where:{
                id:id.id
            }
        })        
        reply.code(200).send('Deleted suscessfully')
    } catch (error: any) {
        reply.code(400).send('The operation can\' t be resolve')

    }
}