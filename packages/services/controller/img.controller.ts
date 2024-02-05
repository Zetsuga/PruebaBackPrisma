import { FastifyReply, FastifyRequest } from 'fastify';
import cloudinary from 'cloudinary'
import fastifyMultipart from '@fastify/multipart';
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client';
import { UserRequest } from '../interfaces/img.interfaces';
const prisma = new PrismaClient()
dotenv.config();

cloudinary.v2.config({
    cloud_name: 'dcljg8nww',
    api_key: '967215433155685',
    api_secret: 'zuBmB2FqJkDRHCzUuZ3gcUaJLEI',
    secure: true,
  });
  
export const imgDownloader = async(request:UserRequest, reply:FastifyReply) => {
    try {
        console.log('========>>>>>>>>>>>>> ',request['authUser'])
        const dataImg : any = await prisma.imgUser.findUnique({
            where:{
                id_user:request['authUser']
            }
        })
        if(dataImg){ 
            console.log('????????????????????????????????');
            
            const result = cloudinary.v2.url(dataImg.id_img)

            reply.code(200).send(result)
        }
        reply.code(405).send('Cannot find a image')        
    } catch (error: any) {
        console.log(error);
        
        reply.code(200).send('Error on the server')
    }
}


export const imgUploader = async(request:UserRequest, reply:FastifyReply) => {
    try {
        const fileData = await request.file();
        const mimetype = fileData.mimetype
        console.log('=====> ',mimetype)
        const img = (await fileData.toBuffer()).toString('base64')
        const data = `data:${mimetype};base64,${img}`;
        const result = await cloudinary.v2.uploader.upload(data)
        if(result){
            console.log(request['authUser']);
            console.log('-----> ',result.public_id)
            const dataImg : any = await prisma.imgUser.create({
                data:{
                    id_user: request['authUser'],
                    id_img : result.public_id
                }
            })
            reply.code(200).send(result)
        }
        reply.code(405).send('Not possible to save the image')
    } catch (error: any) {        
        console.log(error)
        reply.code(200).send('Error on the server')
    }
}