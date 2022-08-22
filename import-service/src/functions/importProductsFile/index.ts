import { handlerPath } from '@libs/handler-resolver';
import documentation from './documentation';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              name: true,
            }
          }
        },
        cors: true,
        authorizer: {
          name: 'basicAuthorizer',
          identitySource: 'method.request.header.Authorization',
          arn: 'arn:aws:lambda:${self:provider.region}:${aws:accountId}:function:authorization-service-dev-basicAuthorizer',
          resultTtlInSeconds: 0,
          type: 'token',
        },
        ...documentation,
      },
    },
  ],
};
