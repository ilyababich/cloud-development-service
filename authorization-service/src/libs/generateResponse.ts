import { APIGatewayAuthorizerResult, PolicyDocument } from "aws-lambda";

export const generatePolicy = (effect: string, resource: string): PolicyDocument => {
    return {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }]
      }
};

export const generateResponse = (principalId: string, effect: 'Allow' | 'Deny', resource: string): APIGatewayAuthorizerResult => {
    return {
        principalId,
        policyDocument: generatePolicy(effect, resource),
      };
};