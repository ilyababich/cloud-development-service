import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>, statusCode:number) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    } 
  }
}

export const errorResponse = ( error: Error, statusCode: number = 500) => {
  return formatJSONResponse({message: error.message || 'Something went wrong!'}, statusCode);
}


export const successResponse = (body: Record<string, unknown>, statusCode: number = 200) => {
  return formatJSONResponse(body, statusCode)
}