import { UserRequest, imgDao, userDAO } from '../interfaces/img.interfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { PrismaClient } from '@prisma/client';
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
const prisma = new PrismaClient()
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
  });
  
export const imgDownloader = async(request:UserRequest, reply:FastifyReply): Promise<void> => {
    try {
        const dataImg : imgDao = await prisma.imgUser.findUnique({
            where:{
                id_user:request['authUser']
            }
        })
        if(dataImg){ 
            const result : any= cloudinary.v2.url(dataImg.id_img)
            reply.code(200).send(result)
        }
        reply.code(405).send('Cannot find a image')        
    } catch (error: any) {        
        reply.code(200).send('Error on the server')
    }
}


export const imgUploader = async(request:UserRequest, reply:FastifyReply) : Promise<void> => {
    try {

        const dataUser :imgDao= await prisma.imgUser.findUnique({
            where:{
                id_user:request['authUser']
            }
        })
        if(!dataUser){
            const fileData : any= await request.file();
            const mimetype : string = fileData.mimetype
            const img : any= (await fileData.toBuffer()).toString('base64')
            const data :string = `data:${mimetype};base64,${img}`;
            const result : any= await cloudinary.v2.uploader.upload(data)
            if(result){
                const dataImg : imgDao = await prisma.imgUser.create({
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
        reply.code(200).send('Error on the server')
    }
}