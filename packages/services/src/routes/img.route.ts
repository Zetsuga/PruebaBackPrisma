import { checkTokenJWT, validateUser } from "../middleware/auth.middleware";
import { imgDownloader, imgUploader } from "../controller/img.controller";
import { checkLogo } from "../middleware/img.middleware";
import { FastifyInstance } from "fastify";

const imgRoute = async(fastify:FastifyInstance) => {
    fastify.decorateRequest('authUser','')

    fastify.route({
        method:'GET',
        url:'/',
        preHandler:[checkTokenJWT,validateUser],
        handler:imgDownloader
    })

    fastify.route({
        method:'POST',
        url:'/',
        schema:{
            body:{
                content:{type:`file`}
            }
        },
        preHandler:[checkTokenJWT,validateUser,checkLogo],
        handler:imgUploader
    })
}


export default imgRoute;