import { middyfy } from '@libs/lambda';
import { SQSEvent, SQSHandler } from 'aws-lambda';

import productService from 'src/services/productService';
import { TProduct } from 'src/services/postgressProductService';

export const CatalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    try {

        for (let record of event.Records) {
            const productInfo = JSON.parse(record.body);
            console.log(productInfo);
      
           await productService.createProduct(productInfo as TProduct);
        }
        console.log('Success')
    } catch(err) {
        console.log('Error', err)
    }
};

export const main = middyfy(CatalogBatchProcess);
