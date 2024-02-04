import { getAllUser, getUserById, getUserProfile, createUser, deleteUser, updateUser } from "../controller/user.controller";
import { checkTokenJWT, validateUser } from "../middlewares/auth.middleware";
import { FastifyInstance } from "fastify";

async function userRoute(fastify:FastifyInstance) {
    fastify.decorateRequest('authUser','')

    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: {
            params:{
                id:{type:'number'}
            }
        },

        preHandler:[checkTokenJWT,validateUser],
        handler: getUserById
    })

    fastify.route({
        method: 'GET',
        url:'/',
        preHandler:[checkTokenJWT,validateUser],
        handler: getAllUser
    })

    fastify.route({
        method:'GET',
        url:'/profile',
        preHandler:[checkTokenJWT,validateUser],
        handler:getUserProfile
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
        preHandler:[checkTokenJWT,validateUser],
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
        preHandler:[checkTokenJWT,validateUser],
        handler: deleteUser
    })

}

export default userRoute;