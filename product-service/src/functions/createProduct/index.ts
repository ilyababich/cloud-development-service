import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

import documentation from './documentation';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
            schemas: {
                'application/json': schema,
            }
        },
        ...documentation,
      },
    },
  ],
};