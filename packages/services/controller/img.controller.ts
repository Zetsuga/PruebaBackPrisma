import { FastifyReply, FastifyRequest } from 'fastify';
import cloudinary from 'cloudinary'
import fastifyMultipart from '@fastify/multipart';
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client';
import { UserRequest } from '../interfaces/img.interfaces';
const prisma = new PrismaClient()
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
  });
  
export const imgDownloader = async(request:UserRequest, reply:FastifyReply) => {
    try {
        const dataImg : any = await prisma.imgUser.findUnique({
            where:{
                id_user:request['authUser']
            }
        })
        if(dataImg){ 
            const result = cloudinary.v2.url(dataImg.id_img)
            reply.code(200).send(result)
        }
        reply.code(405).send('Cannot find a image')        
    } catch (error: any) {        
        reply.code(200).send('Error on the server')
    }
}


export const imgUploader = async(request:UserRequest, reply:FastifyReply) => {
    try {

        const dataUser = await prisma.imgUser.findUnique({
            where:{
                id_user:request['authUser']
            }
        })
        if(!dataUser){
            const fileData = await request.file();
            const mimetype = fileData.mimetype
            const img = (await fileData.toBuffer()).toString('base64')
            const data = `data:${mimetype};base64,${img}`;
            const result = await cloudinary.v2.uploader.upload(data)
            if(result){
                const dataImg : any = await prisma.imgUser.create({
                    data:{
                        id_user: request['authUser'],
                        id_img : result.public_id
                    }
                })
                reply.code(200).send('Image save')
            }
            reply.code(405).send('Not possible to save the image')
        }
        reply.code(405).send('U cant have more tahn one image in your profile')
    } catch (error: any) {        
        console.log(error)
        reply.code(200).send('Error on the server')
    }
}