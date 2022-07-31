// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "import-service",
    "version": "1"
  },
  "paths": {
    "/import": {
      "get": {
        "summary": "importProductsFile",
        "description": "returns url for uploading files to s3",
        "operationId": "importProductsFile.get.import",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "name",
            "type": "string",
            "description": "name of file",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Ok",
            "schema": {
              "$ref": "#/definitions/importProductSuccess"
            }
          },
          "500": {
            "description": "Something went wrong!",
            "schema": {
              "$ref": "#/definitions/CommonFailed"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "CommonFailed": {
      "properties": {
        "message": {
          "title": "CommonFailed.message",
          "type": "string"
        },
        "event": {
          "additionalProperties": false,
          "title": "CommonFailed.event",
          "type": "object"
        }
      },
      "required": [
        "message",
        "event"
      ],
      "additionalProperties": false,
      "title": "CommonFailed",
      "type": "object"
    },
    "importProductSuccess": {
      "properties": {
        "url": {
          "title": "importProductSuccess.url",
          "type": "string"
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "title": "importProductSuccess",
      "type": "object"
    }
  },
  "securityDefinitions": {},
  "host": "r96qinczs1.execute-api.eu-west-1.amazonaws.com/dev/"
};