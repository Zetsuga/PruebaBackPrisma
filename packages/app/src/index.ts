import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
//import UserRouter from './routes/user.route';
//import { userSchemas } from "./schema/user.schema";

export const app : FastifyInstance = fastify();

declare module "fastify" {
    export interface FastifyInstance{
        auth: any
    }
}

app.register(fastifyJwt,{
    secret: 'sokdfjsodfsjn45slvkmslvmpsj3flskdngslr7nlj'
})

app.decorate("auth", 
    async(req:FastifyRequest,rep:FastifyReply)=>{
        try {
            await req.jwtVerify()
        } catch (err : any) {
            rep.send(err)   
        }
    }
)

async function main(){
    
    //for(const schema of userSchemas){
    //    app.addSchema(schema);
    //}
    
    //app.register(UserRouter,{prefix:"user"})

    try{
        await app.listen({port:7001,host:"0.0.0.0"});
        console.log(`server listening on port: 7000`)
    }catch(err : any){
        console.error(err)
        process.exit(1);
    }
}

main()
