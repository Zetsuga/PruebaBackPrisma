import Fastify, { FastifyInstance } from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import options from "./utils/swagger.options";
import fastifySwagger from '@fastify/swagger'
import imgRoute from "./routes/img.route";

const fastify :FastifyInstance = Fastify({
    //logger:true
});

fastify.register(fastifySwagger,options);
fastify.register(fastifySwaggerUi,{})
fastify.register(require('@fastify/multipart'))
fastify.register(imgRoute,{prefix:'/img'})

fastify.listen({ port: 7002 }, function (err: any, address: any) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.options
    fastify.log.info(`Server listening at ${address}`)
})
