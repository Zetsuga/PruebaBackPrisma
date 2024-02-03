import Fastify, { FastifyInstance } from "fastify";
import userRoute from './routes/user.route'
import postRoute from './routes/post.route'

const fastify :FastifyInstance = Fastify({
    logger:true
});

fastify.register(userRoute,{prefix:'/user'})
fastify.register(postRoute,{prefix:'/post'})

fastify.listen({ port: 7001 }, function (err: any, address: any) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`Server listening at ${address}`)
})
