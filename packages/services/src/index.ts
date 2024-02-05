import Fastify, { FastifyInstance } from "fastify";
import imgRoute from "./routes/img.route";

const fastify :FastifyInstance = Fastify({
    //logger:true
});

fastify.register(require('@fastify/multipart'))
fastify.register(imgRoute,{prefix:'/img'})

fastify.listen({ port: 7002 }, function (err: any, address: any) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`Server listening at ${address}`)
})
