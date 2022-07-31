import { handlerPath } from '@libs/handler-resolver';
import { BUCKET_NAME, UPLOADED_FOLDER } from 'src/consts';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET_NAME,
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: `${UPLOADED_FOLDER}/`
          }
        ],
        existing: true
      }
    },
  ],
};
