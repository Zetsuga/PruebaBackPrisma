export interface schemaRouter{
    schema:{
        body?:schemaBody,
        response?:schemaResponse
    }
}

interface schemaBody{
    type?: string,
    properties?:{
        someKey?:any,
        someOtherKey?:any
    }
}

interface schemaResponse{
    [statusCode:number] : {
        type?:string,
        properties?: any
    }
}