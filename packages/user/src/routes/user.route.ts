import { getAllUser, getUserById, getUserProfile, deleteUser, updateUser, chageRoleUser } from "../controller/user.controller";
import { checkPermission, checkTokenJWT, validateUser } from "../middlewares/auth.middleware";
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

        preHandler:[checkTokenJWT,validateUser,checkPermission],
        handler: getUserById
    })

    fastify.route({
        method: 'GET',
        url:'/',
        preHandler:[checkTokenJWT,validateUser,checkPermission],
        handler: getAllUser
    })

    fastify.route({
        method:'GET',
        url:'/profile',
        preHandler:[checkTokenJWT,validateUser],
        handler:getUserProfile
    })

    fastify.route({
        method: 'PATCH',
        url:'/',
        schema:{
            body:{
                name:{type:'string'}
            }
        },
        preHandler:[checkTokenJWT,validateUser],
        handler: updateUser
    })

    fastify.route({
        method:'DELETE',
        url:'/',
        preHandler:[checkTokenJWT,validateUser],
        handler: deleteUser
    })

    fastify.route({
        method:'PATCH',
        url:'/role',
        preHandler: [checkTokenJWT,validateUser,checkPermission],
        handler:chageRoleUser
    })

}

export default userRoute;