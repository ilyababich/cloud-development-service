import * as AWS from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { S3Event } from 'aws-lambda';
// import { BUCKET_NAME, PARSED_FOLDER, UPLOADED_FOLDER } from 'src/consts';
import { errorResponse, successResponse } from '@libs/api-gateway';
import { BUCKET_NAME } from 'src/consts';
// import { createReadStream } from 'fs';

const importFileParser= async (event: S3Event) => {
    try {
        const s3 = new AWS.S3({region: 'eu-west-1'});
  
        console.log('Records:', event.Records);
    
        event.Records.map(async (record) => {
            // await s3.copyObject({
            //     Bucket: BUCKET_NAME,
            //     CopySource: `${BUCKET_NAME}/${record.s3.object.key}`,
            //     Key: record.s3.object.key.replace(UPLOADED_FOLDER, PARSED_FOLDER)
            // }).promise()

           const object = await s3.getObject({
                Bucket: BUCKET_NAME,
                Key: record.s3.object.key
            }).promise();


            
        })

        return successResponse({message: 'Success'})
    } catch (err) {
        console.log(err)
        return errorResponse(err)
    }
    
};

export const main = middyfy(importFileParser);
