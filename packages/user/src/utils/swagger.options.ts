
export const options =  {
    routePrefix: '/apidoc',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Api Documentation',
        description: 'API APP for login and create users',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:7000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  }

  export default options;