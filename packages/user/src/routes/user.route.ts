import { getAllUser, getUserById, createUser, deleteUser, updateUser } from "../controller/user.controller";
import { FastifyInstance } from "fastify";

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
                name:{type:'string'},
                lastName:{type:'string'},
                adress:{type:'string'}
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