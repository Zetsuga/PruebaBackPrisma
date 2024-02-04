import { FastifyInstance } from 'fastify'
import { createUser, loginUser } from '../controller/login.controller';
import { checkEmail } from '../middleware/login.middleware';

const loginRoute = async (fastify:FastifyInstance)=>{

    fastify.route({
        method:'POST',
        url:'/',
        schema:{
            body: {
                email:{type:'string'},
                pass:{type:'string'}
            }
        },
        handler:loginUser

    })

    fastify.route({
        method:'POST',
        url:'/create',
        schema:{
            body:{
                email:{type:'string'},
                pass:{type:'string'}
            }
        },
        preHandler:[checkEmail],
        handler:createUser
    })
}

export default loginRoute;
