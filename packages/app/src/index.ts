import Fastify, { FastifyInstance } from "fastify";
import loginRoute  from './routes/login.route'

const fastify :FastifyInstance = Fastify({
    logger:true
});

fastify.register(loginRoute,{prefix:'/login'})


fastify.listen({ port: 7000 }, function (err: any, address: any) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`Server listening at ${address}`)
})
