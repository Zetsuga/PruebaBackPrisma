import { createUser, loginUser } from '../controller/login.controller';
import { checkEmail } from '../middleware/login.middleware';
import { FastifyInstance } from 'fastify'

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
                name:{type:'string'},
                lastName:{type:'string'},
                address:{type:'string'},
                email:{type:'string'},
                pass:{type:'string'}
            }
        },
        preHandler:[checkEmail],
        handler:createUser
    })
}

export default loginRoute;
