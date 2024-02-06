import { createPost, deletePost, getAllPost, getPostById, updatePost } from "../controller/post.controller";
import { checkTokenJWT, validateUser } from "../middlewares/auth.middleware";
import { FastifyInstance } from "fastify";

const postRoute = async (fastify:FastifyInstance)=>{
    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: {
            params:{
                id:{type:'number'}
            }
        },
        preHandler:[checkTokenJWT,validateUser],
        handler: getPostById
    })

    fastify.route({
        method: 'GET',
        url:'/',
        preHandler:[checkTokenJWT,validateUser],
        handler: getAllPost
    })

    fastify.route({
        method: 'POST',
        url:'/',
        schema:{
            body:{
                title:{type:'string'},
                content:{type:'string'}
            }
        },
        preHandler:[checkTokenJWT,validateUser],
        handler: createPost
    })

    fastify.route({
        method: 'PATCH',
        url:'/',
        schema:{
            body:{
                title:{type:'string'},
                content:{type:'string'}
            }
        },
        preHandler:[checkTokenJWT,validateUser],
        handler: updatePost
    })

    fastify.route({
        method:'DELETE',
        url:'/:id',
        preHandler:[checkTokenJWT,validateUser],
        handler:deletePost
    })
}

export default postRoute;