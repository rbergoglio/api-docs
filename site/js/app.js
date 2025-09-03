
    const schema = {
  "asyncapi": "2.6.0",
  "info": {
    "title": "CORE Event Bus (Draft)",
    "version": "0.1.1",
    "description": "Especificación AsyncAPI del bus de eventos para el módulo CORE. Transporte principal: RabbitMQ (AMQP 0-9-1) con exchange tipo *topic* `core.events`. Los eventos siguen un *envelope* estilo **CloudEvents 1.0** (campos: specversion, id, source, type, subject, time, data).\n"
  },
  "defaultContentType": "application/json",
  "servers": {
    "rabbitmqLocal": {
      "url": "amqp://guest:guest@localhost:5672",
      "protocol": "amqp",
      "protocolVersion": "0-9-1",
      "description": "RabbitMQ local (desarrollo)"
    }
  },
  "channels": {
    "grade.published.v1": {
      "description": "Evento emitido cuando se publica una **nota** en un acta.",
      "bindings": {
        "amqp": {
          "is": "routingKey",
          "exchange": {
            "name": "core.events",
            "type": "topic",
            "durable": true,
            "autoDelete": false
          },
          "bindingVersion": "0.2.0"
        }
      },
      "publish": {
        "summary": "El módulo Docente publica que se ha publicado una nota.",
        "operationId": "publishGradePublishedV1",
        "message": {
          "name": "grade.published.v1",
          "title": "Grade Published (v1)",
          "summary": "Se publicó una nota de un alumno en un acta.",
          "contentType": "application/json",
          "payload": {
            "allOf": [
              {
                "type": "object",
                "required": [
                  "specversion",
                  "id",
                  "source",
                  "type",
                  "data"
                ],
                "properties": {
                  "specversion": {
                    "type": "string",
                    "enum": [
                      "1.0"
                    ],
                    "description": "Versión de CloudEvents.",
                    "x-parser-schema-id": "<anonymous-schema-2>"
                  },
                  "id": {
                    "type": "string",
                    "description": "Identificador único del evento.",
                    "x-parser-schema-id": "<anonymous-schema-3>"
                  },
                  "source": {
                    "type": "string",
                    "description": "Productor del evento (dominio/recurso), ej. `docente/actas`.",
                    "x-parser-schema-id": "<anonymous-schema-4>"
                  },
                  "type": {
                    "type": "string",
                    "description": "Nombre del evento versionado, ej. `grade.published.v1`.",
                    "x-parser-schema-id": "<anonymous-schema-5>"
                  },
                  "subject": {
                    "type": "string",
                    "description": "Identificador del agregado, ej. `acta:{id}` o `alumno:{id}`.",
                    "x-parser-schema-id": "<anonymous-schema-6>"
                  },
                  "time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Fecha/hora del evento en ISO-8601 UTC.",
                    "x-parser-schema-id": "<anonymous-schema-7>"
                  },
                  "datacontenttype": {
                    "type": "string",
                    "default": "application/json",
                    "description": "Tipo de contenido del payload de `data`.",
                    "x-parser-schema-id": "<anonymous-schema-8>"
                  },
                  "data": {
                    "description": "Carga útil específica del evento.",
                    "type": "object",
                    "x-parser-schema-id": "<anonymous-schema-9>"
                  }
                },
                "x-parser-schema-id": "CloudEventBase"
              },
              {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "const": "grade.published.v1",
                    "x-parser-schema-id": "<anonymous-schema-11>"
                  },
                  "data": {
                    "type": "object",
                    "required": [
                      "acta_id",
                      "curso_id",
                      "alumno_id",
                      "evaluacion",
                      "tipo",
                      "nota"
                    ],
                    "properties": {
                      "acta_id": {
                        "type": "string",
                        "description": "ID del acta.",
                        "x-parser-schema-id": "<anonymous-schema-12>"
                      },
                      "curso_id": {
                        "type": "string",
                        "description": "ID del curso.",
                        "x-parser-schema-id": "<anonymous-schema-13>"
                      },
                      "alumno_id": {
                        "type": "string",
                        "description": "ID del alumno.",
                        "x-parser-schema-id": "<anonymous-schema-14>"
                      },
                      "evaluacion": {
                        "type": "string",
                        "description": "Nombre de la evaluación (ej. '1er parcial').",
                        "x-parser-schema-id": "<anonymous-schema-15>"
                      },
                      "tipo": {
                        "type": "string",
                        "enum": [
                          "parcial",
                          "recuperatorio",
                          "final"
                        ],
                        "x-parser-schema-id": "<anonymous-schema-16>"
                      },
                      "nota": {
                        "type": "number",
                        "minimum": 0,
                        "maximum": 10,
                        "description": "Calificación numérica.",
                        "x-parser-schema-id": "<anonymous-schema-17>"
                      }
                    },
                    "x-parser-schema-id": "GradePublishedData"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-10>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "examples": [
            {
              "name": "Ejemplo grade.published.v1",
              "payload": {
                "specversion": "1.0",
                "id": "evt-8bde7f8a",
                "source": "docente/actas",
                "type": "grade.published.v1",
                "subject": "acta:a_1/alumno:al_55",
                "time": "2025-09-03T19:00:00Z",
                "datacontenttype": "application/json",
                "data": {
                  "acta_id": "a_1",
                  "curso_id": "c_123",
                  "alumno_id": "al_55",
                  "evaluacion": "1er parcial",
                  "tipo": "parcial",
                  "nota": 8
                }
              }
            }
          ],
          "bindings": {
            "amqp": {
              "contentEncoding": "utf-8",
              "bindingVersion": "0.2.0"
            }
          }
        }
      },
      "subscribe": {
        "summary": "Otros módulos (CORE, Biblioteca, Portal Alumno, etc.) consumen este evento.",
        "operationId": "subscribeGradePublishedV1",
        "bindings": {
          "amqp": {
            "ack": true,
            "bindingVersion": "0.2.0"
          }
        },
        "message": "$ref:$.channels.grade.published.v1.publish.message"
      }
    },
    "acta.closed.v1": {
      "description": "Evento emitido cuando un **acta** cambia a estado *cerrada*.",
      "bindings": {
        "amqp": {
          "is": "routingKey",
          "exchange": {
            "name": "core.events",
            "type": "topic",
            "durable": true,
            "autoDelete": false
          },
          "bindingVersion": "0.2.0"
        }
      },
      "publish": {
        "summary": "El módulo Docente publica el cierre de un acta.",
        "operationId": "publishActaClosedV1",
        "message": {
          "name": "acta.closed.v1",
          "title": "Acta Closed (v1)",
          "summary": "Un acta fue cerrada.",
          "contentType": "application/json",
          "payload": {
            "allOf": [
              "$ref:$.channels.grade.published.v1.publish.message.payload.allOf[0]",
              {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "const": "acta.closed.v1",
                    "x-parser-schema-id": "<anonymous-schema-20>"
                  },
                  "data": {
                    "type": "object",
                    "required": [
                      "acta_id",
                      "curso_id",
                      "fecha_cierre",
                      "estado"
                    ],
                    "properties": {
                      "acta_id": {
                        "type": "string",
                        "description": "ID del acta.",
                        "x-parser-schema-id": "<anonymous-schema-21>"
                      },
                      "curso_id": {
                        "type": "string",
                        "description": "ID del curso.",
                        "x-parser-schema-id": "<anonymous-schema-22>"
                      },
                      "fecha_cierre": {
                        "type": "string",
                        "format": "date",
                        "description": "Fecha en que el acta fue cerrada.",
                        "x-parser-schema-id": "<anonymous-schema-23>"
                      },
                      "estado": {
                        "type": "string",
                        "enum": [
                          "cerrada"
                        ],
                        "description": "Estado final del acta.",
                        "x-parser-schema-id": "<anonymous-schema-24>"
                      }
                    },
                    "x-parser-schema-id": "ActaClosedData"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-19>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-18>"
          },
          "examples": [
            {
              "name": "Ejemplo acta.closed.v1",
              "payload": {
                "specversion": "1.0",
                "id": "evt-23cd91af",
                "source": "docente/actas",
                "type": "acta.closed.v1",
                "subject": "acta:a_1",
                "time": "2025-09-03T19:05:00Z",
                "datacontenttype": "application/json",
                "data": {
                  "acta_id": "a_1",
                  "curso_id": "c_123",
                  "fecha_cierre": "2025-09-01",
                  "estado": "cerrada"
                }
              }
            }
          ],
          "bindings": {
            "amqp": {
              "contentEncoding": "utf-8",
              "bindingVersion": "0.2.0"
            }
          }
        }
      },
      "subscribe": {
        "summary": "Otros módulos consumen este evento para refrescar sus *read models*.",
        "operationId": "subscribeActaClosedV1",
        "bindings": {
          "amqp": {
            "ack": true,
            "bindingVersion": "0.2.0"
          }
        },
        "message": "$ref:$.channels.acta.closed.v1.publish.message"
      }
    }
  },
  "components": {
    "schemas": {
      "CloudEventBase": "$ref:$.channels.grade.published.v1.publish.message.payload.allOf[0]",
      "GradePublishedData": "$ref:$.channels.grade.published.v1.publish.message.payload.allOf[1].properties.data",
      "ActaClosedData": "$ref:$.channels.acta.closed.v1.publish.message.payload.allOf[1].properties.data"
    },
    "messages": {
      "GradePublishedV1": "$ref:$.channels.grade.published.v1.publish.message",
      "ActaClosedV1": "$ref:$.channels.acta.closed.v1.publish.message"
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":true},"sidebar":{"showOperations":"byDefault"}};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  