import * as AWS from 'aws-sdk';
import { errorResponse, successResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof Object> = async (event) => {
  try {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    const catalogName = event.queryStringParameters.name;

    const params = {
      Bucket: process.env.BUCKET,
      Key: `uploaded/${catalogName}`,
      Expires: 60,
      ContentType: 'txt/csv',
    };

    const url = await s3.getSignedUrlPromise('putObject', params);
    console.log('Signed url:', url );

    return successResponse({ url });

  } catch(error) {
    console.log(error)
    return errorResponse(error);
  }
};

export const main = middyfy(importProductsFile);
