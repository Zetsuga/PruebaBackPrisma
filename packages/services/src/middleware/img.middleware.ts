import { FastifyReply, FastifyRequest } from "fastify";

export const checkLogo = async (request: FastifyRequest, reply: FastifyReply) : Promise<void>=> {
    try {
        if (!request.headers['content-type']?.includes('multipart/form-data') || !request.file()) {
            reply.code(405).send('Error on the Call');
        }
        
        const dictionary : string[]= ['jpeg', 'jpg', 'png'];
        const file : any= await request.file();
        if (!dictionary.includes(file.filename.split('.')[file.filename.split('.').length - 1]))
            reply.code(405).send('File not suported')
    } catch (err: any) {
        console.log(err)
        reply.code(400).send('Error to load image')
    }
  };

const checkMagicNumber = async(fileBuffer: any): Promise<boolean> => {
    try {        
        const magicNumbers: string[] = ['89504e47', 'ffd8ffe0', 'ffd8ffee', 'ffd8ffdb', 'ffd8ffe1'];
        const header = fileBuffer.toString('hex', 0, 8);
                
        return magicNumbers.some(magicNumber => header.startsWith(magicNumber));
      } catch (error: any) {
        return false;
      }
}