const swaggerJsdoc = require("swagger-jsdoc")


const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "MusicUni - API Express con Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "Esta es una aplicación CRUD API hecha con Express y documentada con Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        }
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
      ],
      
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            actividades: {
                type: "object",
                required: ["nombre", "descripcion", "instrumento", "horarios"],
                properties: {
                    nombre: {
                        type: "string",
                        example: "Club de cajón",
                        description: "El nombre de la actividad"
                    },
                    descripcion: {
                        type: "string",
                        example: "Este es un club de cajoón en el que aprenderemos a tocar cajón",
                        description: "La descripción de la actividad"
                    },
                    lugar: {
                        type: "string",
                        example: "M202",
                        description: "El lugar/aula donde se realiza la actividad"
                    },
                    gusto_musical: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["flamenco", "pop", "jazz"],
                        description: "Los gustos musicales relacionados con la actividad"
                    },
                    instrumento: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["cajón", "palmas"],
                        description: "Los instrumentos relacionados con la actividad"
                    },
                    prioridad: {
                        type: "boolean",
                        example: true,
                        description: "La prioridad de la actividad. Es decir, si se muestra en la pantalla principal o no"
                    },
                    usuarios: {
                        type: "array",
                        format: "mongo id",
                        items: {
                            type: "string"
                        },
                        example: ["65f22f0800c7c18e6fa74aaa", "6602c1c3417dac099dcaa748"],
                        description: "Los usuarios que participan en la actividad"
                    },
                    creadoPor: {
                        type: "string",
                        format: "mongo id",
                        example: "65f22f0800c7c18e6fa74aaa",
                        description: "El usuario que creó la actividad"
                    },
                    horarios: {
                        type: "string",
                        example: "Lunes de 10 a 12",
                        description: "Los horarios de la actividad"
                    },
                    grupo: {
                        type: "string",
                        format: "mongo id",
                        example: "65f22f0800c7c18e6fa74aaa",
                        description: "El grupo asociado con la actividad"
                    }
                }
            },
            mensaje: {
                type: "object",
                required: ["autorMensaje", "mensaje", "grupo" ],
                properties: {
                    autorMensaje: {
                        type: "string",
                        format: "mongo id",
                        example: "65f22f0800c7c18e6fa74aaa",
                        description: "El autor del mensaje"
                    },
                    mensaje: {
                        type: "string",
                        example: "Hola, ¿qué tal?",
                        description: "El texto del mensaje"
                    },
                    grupo: {
                        type: "string",
                        example: "FLAMENCO",
                        description: "El grupo asociado con el mensaje. Puede ser un foro generico o unchat de actividad"
                    },
                    padreMensaje: {
                        type: "string",
                        format: "mongo id",
                        example: "65f22f0800c7c18e6fa74aaa",
                        description: "El mensaje padre. El mensaje al que responde este mensaje"
                    },
                    mediaId: {
                        type: "string",
                        format: "mongo id",
                        example: "65f22f0800c7c18e6fa74aaa",
                        description: "El ID de la foto asociado con el mensaje"
                    }
                
                }
            }
        },
      },
    },
    apis: ["./routes/*.js"],
  };

  module.exports = swaggerJsdoc(options)


  


