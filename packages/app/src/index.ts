import Fastify, { FastifyInstance } from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import loginRoute  from './routes/login.route'
import fastifySwagger from '@fastify/swagger'
import options from "./utils/swagger.options";

const fastify :FastifyInstance = Fastify({
    logger:true
});

fastify.register(fastifySwagger,options);
fastify.register(fastifySwaggerUi,{})

fastify.register(loginRoute,{prefix:'/login'})

fastify.listen({ port: 7000 }, function (err: any, address: any) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.options;
    fastify.log.info(`Server listening at ${address}`)
})
