import { generateResponse } from "@libs/generateResponse";
import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";

export const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  
  if (event.type !== 'TOKEN') {
    return 'Unauthorized';
  }

  try {

    const authToken = event.authorizationToken.split(' ')[1]
    const credentials = Buffer.from(authToken, 'base64').toString()
    const [username, password] = credentials.split(':');

    const effect = process.env[username] === password ? 'Allow' : 'Deny';

    return generateResponse(credentials, effect, event.methodArn);

  } catch(err) {
    return `Unauthorized ${err}`;
  }
};
