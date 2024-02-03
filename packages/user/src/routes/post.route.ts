import { FastifyInstance } from "fastify";
import { getAllPost, getPostById } from "../controller/post.controller";

const postRoute = async (fastify:FastifyInstance)=>{
    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: {
            params:{
                id:{type:'number'}
            }
        },
        handler: getPostById
    })

    fastify.route({
        method: 'GET',
        url:'/',
        handler: getAllPost
    })
}

export default postRoute;