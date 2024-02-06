import Fastify, { FastifyInstance } from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from '@fastify/swagger';
import options from "./utils/swagger.options";
import userRoute from './routes/user.route'
import postRoute from './routes/post.route'

const fastify :FastifyInstance = Fastify({
    logger:true
});

fastify.register(fastifySwagger,options);
fastify.register(fastifySwaggerUi,{})
fastify.register(userRoute,{prefix:'/user'})
fastify.register(postRoute,{prefix:'/post'})

fastify.listen({ port: 7001 }, function (err: any, address: any) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.options;
    fastify.log.info(`Server listening at ${address}`)
})
