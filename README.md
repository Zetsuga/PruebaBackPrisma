
# Proyecto Backend

Este proyecto es un monorepo de 3 apis, está realizado con las siguientes tecnologías, Fastify como framework para las apis, prisma un ORM para la gestión de las llamadas a la base de datos en postgresql.

## Lista de endpoints

API App
- Crear Usuario
- Login

API USER
- Buscar un usuario por ID
- Obtener mi perfil
- Obtener todos los usuarios
- Modificar un perfil
- Eliminar un perfil
- Crear un post
- Buscar todos los post
- Buscar un post por ID
- Modificar un post
- Eliminar un post

API SERVICE
- Guardar imagen de perfil
- Descargar imagen de perfil

MIDDLEWARE
- Verificación de usuario
- Verificación de token
- Verificación de archivo JPG o PNG
- Verificación de magic number en imagen
- Verificación de email en login


## Instalación

Ejecuta el siguiente comando en una terminal, en una carpeta creada.
Si tienes una clave SSH ejecuta el codigo que sigue al SSH de lo contrario usa el otro código.

```bash
  SSH: git clone git@github.com:Zetsuga/PruebaBackPrisma.git
  HTTPS: git clone https://github.com/delvedor/fastify-example.git
```

Una vez descargado el código debes de crear el archivo .env en la raiz de el proyecto, puedes usar el template.

Después de crear el archivo ejecuta lo siguiente

```bash 
  npm install 
  npm run prisma:generate
```

Para lanzar las apis tienes que lanzar el siguiente código en el raiz.
```bash 
  npm run dev
```

    
## Variables de entorno

Para hacer funcionar el proyecto se debe de agregar las siguientes variables, en el raiz hay un ejemplo de archivo .env

`DATABASE_URL`
`JWT_KEY`
`CLOUD_NAME`
`CLOUD_KEY`
`CLOUD_SECRET`


## Documentación con SWAGGER

[API APP](localhost:7000) localhost:7000

[API USER](localhost:7001) localhost:7001

[API SERVICE](localhost:7002) localhost:7002


## Anotaciones finales

Los siguientes puntos no han sido terminados

+ Despliegue en netlify, se ha intentado un despliegue en netlify con el monorepo pero no he conseguido echarlo a andar

+ Websocket, no entendí esta parte al no llevar un front para escucharlo, pensé en generar un sistema de envío de emails cada vez que se hiciera un cambio importante

+ Testing con JEST, no dispongo de tanta experiencia, tiene instalado JEST

