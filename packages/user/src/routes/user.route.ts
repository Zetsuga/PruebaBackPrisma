import { ClientRequest, request } from "http";
import { getAllUser, getUserById, createUser, deleteUser, updateUser } from "../controller/user.controller";
import { FastifyInstance, FastifyRequest } from "fastify";

async function userRoute(fastify:FastifyInstance) {

    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: {
            params:{
                id:{type:'number'}
            }
        },
        handler: getUserById
    })

    fastify.route({
        method: 'GET',
        url:'/',
        handler: getAllUser
    })

    fastify.route({
        method: 'POST',
        url:'/',
        schema: {
            body:{
                name:{type:'string'}
            }
        },
        handler: createUser,

    })

    fastify.route({
        method: 'PATCH',
        url:'/:id',
        schema:{
            body:{
                name:{type:'string'}
            },
            params:{
                id:{type:'number'} 
            }
        },
        handler: updateUser
    })

    fastify.route({
        method:'DELETE',
        url:'/:id',
        schema: {
            params:{
                id:{type:'number'}
            }
        },
        handler: deleteUser
    })

}

export default userRoute;