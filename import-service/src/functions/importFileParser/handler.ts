import csv from 'csv-parser';
import * as AWS from 'aws-sdk';
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"
import { middyfy } from '@libs/lambda';
import { S3Event } from 'aws-lambda';
import { BUCKET_NAME, PARSED_FOLDER, UPLOADED_FOLDER } from 'src/consts';
import { errorResponse, successResponse } from '@libs/api-gateway';

const importFileParser= async (event: S3Event) => {
    try {
        const s3 = new AWS.S3({region: 'eu-west-1'});
        const sqs = new SQSClient({ region: 'eu-west-1' });
    
        await Promise.all(event.Records.map(async (record) => {
           const objectReadStream = s3.getObject({
                Bucket: BUCKET_NAME,
                Key: record.s3.object.key
            }).createReadStream();

            await new Promise((res, rej) => {
                objectReadStream.pipe(csv())
                    .on('data', async (data) => {
                        await sqs.send(new SendMessageCommand({
                            MessageBody: JSON.stringify(data),
                            QueueUrl: process.env.SQS_URL,
                          }));
                    })
                    .on('error', (error) => {
                        console.log(error);
                        rej(error);
                    })
                    .on('end', async () => { 
                        try {
                            await s3.copyObject({
                                Bucket: BUCKET_NAME,
                                CopySource: `${BUCKET_NAME}/${record.s3.object.key}`,
                                Key: record.s3.object.key.replace(UPLOADED_FOLDER, PARSED_FOLDER)
                            }).promise();

                            await s3.deleteObject({
                                Bucket: BUCKET_NAME,
                                Key: record.s3.object.key,
                            }).promise();

                          return res('Success');
                        } catch(error) {
                            return rej(error)
                        }
                    });
            })
            
        }))

        return successResponse({message: 'Success'})
    } catch (err) {
        console.log(err)
        return errorResponse(err)
    }
    
};

export const main = middyfy(importFileParser);
