# ProyectoFinalPrograWeb

# Sistema de Conferencias  

Este proyecto es un sistema de gestión de conferencias que permite a los usuarios:  

- Registrar y autenticar usuarios.  
- Crear, actualizar y eliminar conferencias.  
- Gestionar lugares donde se realizan las conferencias.  

## Tecnologías Utilizadas  

- **Backend**: Node.js con Express.  
- **Base de Datos**: MongoDB con Mongoose.  
- **Frontend**: HTML, CSS y JavaScript.  
- **Autenticación**: JSON Web Tokens (JWT).  

## Estructura del Proyecto  

- **`models/`**: Contiene los modelos de datos para usuarios, conferencias y lugares.  
- **`controllers/`**: Contiene la lógica de negocio para manejar las solicitudes.  
- **`routes/`**: Define las rutas de la API.  
- **`middleware/`**: Contiene middlewares para autenticación y autorización.  
- **`public/`**: Archivos estáticos como HTML, CSS y JavaScript.  

## Cómo Ejecutar el Proyecto  

1. Clona el repositorio.  
2. Instala las dependencias con `npm install`.  
3. Crea un archivo `.env` con las variables necesarias (por ejemplo, conexión a MongoDB y clave JWT).  
4. Ejecuta el servidor con `npm run dev`.  
5. Accede a la aplicación en `http://localhost:3000`.  

## Funcionalidades  

- **Usuarios**:  
  - Registro y autenticación.  
  - Gestión de usuarios (solo administradores).  

- **Conferencias**:  
  - Crear, listar, actualizar y eliminar conferencias.  

- **Lugares**:  
  - Crear, listar, actualizar y eliminar lugares (solo administradores).

## Diagrama de Arquitectura
![image](https://github.com/user-attachments/assets/9d8494ef-b117-471f-874b-fc8d1613aac7)

- **Frontend**:
  - Interfaz de usuario para el inicio de sesión, registro, conferencias y lugares.
  - JavaScript que maneja la lógica del cliente.
- **Backend**:
  - Controladores que manejan la lógica de negocio para usuarios, conferencias y lugares.
  - Rutas que definen las API para manejar las solicitudes del frontend.
- **Base de Datos**:
  - MongoDB que almacena las colecciones de usuarios, conferencias y lugares.


## Diagrama de Clases
![image](https://github.com/user-attachments/assets/6953a502-b1c5-4f9a-91f7-4b0953194071)

## Tecnologías Usadas
## Node.js:
- Por qué: Node.js es un entorno de ejecución de JavaScript del lado del servidor que permite construir aplicaciones escalables y rápidas. Su modelo de I/O no bloqueante es ideal para   aplicaciones que requieren manejar múltiples conexiones simultáneamente, como un sistema de conferencias donde los usuarios pueden interactuar en tiempo real.
## Express.js:
- Por qué: Express es un framework minimalista para Node.js que facilita la creación de aplicaciones web y APIs. Proporciona una estructura robusta para manejar rutas, middleware y solicitudes HTTP, lo que acelera el desarrollo y mejora la organización del código.
## MongoDB:
- Por qué: MongoDB es una base de datos NoSQL que almacena datos en formato de documentos JSON. Es ideal para aplicaciones que requieren flexibilidad en el esquema de datos, como el sistema de conferencias, donde los datos pueden variar entre conferencias, lugares y usuarios. Además, su capacidad de escalar horizontalmente es beneficiosa para manejar grandes volúmenes de datos.
## Mongoose:
- Por qué: Mongoose es una biblioteca de modelado de objetos para MongoDB y Node.js. Proporciona una solución sencilla para definir esquemas de datos, validar datos y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de manera más estructurada y fácil de usar.
## JSON Web Tokens (JWT):
- Por qué: JWT se utiliza para la autenticación y autorización de usuarios. Permite crear tokens seguros que se pueden enviar entre el cliente y el servidor, asegurando que solo los usuarios autenticados puedan acceder a ciertas rutas y recursos del sistema.
## Bootstrap:
- Por qué: Bootstrap es un framework CSS que facilita el diseño de interfaces de usuario responsivas y atractivas. Su uso permite que la aplicación tenga un diseño moderno y accesible en diferentes dispositivos, mejorando la experiencia del usuario.
## jQuery:
- Por qué: jQuery es una biblioteca de JavaScript que simplifica la manipulación del DOM y la gestión de eventos. Se utiliza en el frontend para facilitar la interacción con la API del backend, como la carga de conferencias y lugares, así como la gestión de formularios.
## dotenv:
- Por qué: dotenv es una biblioteca que permite cargar variables de entorno desde un archivo .env. Esto es útil para gestionar configuraciones sensibles, como credenciales de base de datos y secretos de JWT, sin exponerlos en el código fuente.

 
