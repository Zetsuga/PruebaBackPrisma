import { imgDownloader, imgUploader } from "../../controller/img.controller";
import { checkTokenJWT, validateUser } from "../middleware/auth.middleware";
import { FastifyInstance } from "fastify";

const imgRoute = async(fastify:FastifyInstance) => {
    fastify.decorateRequest('authUser','')

    fastify.route({
        method:'GET',
        url:'/',
        //onResponse:[checkTokenJWT,validateUser],
        preHandler:[checkTokenJWT,validateUser],
        handler:imgDownloader
    })

    fastify.route({
        method:'POST',
        url:'/',
        preHandler:[checkTokenJWT,validateUser],
        handler:imgUploader
    })
}


export default imgRoute;