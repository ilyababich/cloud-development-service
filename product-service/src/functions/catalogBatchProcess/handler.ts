import { middyfy } from '@libs/lambda';
import { SQSEvent, SQSHandler } from 'aws-lambda';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

import productService from 'src/services/productService';

export const CatalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    const snsClient = new SNSClient({ region: 'eu-west-1'});

    try {

        for (let record of event.Records) {
            const productInfo = JSON.parse(record.body);
            console.log(productInfo);
      
           await productService.createProduct({
            title: productInfo.title,
            description: productInfo.description,
            price: Number(productInfo.price),
            count: Number(productInfo.count)
           });

           await snsClient.send(new PublishCommand({
            Subject: 'New product created',
            Message: record.body,
            TopicArn: process.env.SNS_ARN,
           }))
        }
        console.log('Success')
    } catch(err) {
        console.log('Error', err)
    }
};

export const main = middyfy(CatalogBatchProcess);
