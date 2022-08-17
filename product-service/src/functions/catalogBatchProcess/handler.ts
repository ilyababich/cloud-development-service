import { middyfy } from '@libs/lambda';
import { SQSEvent, SQSHandler } from 'aws-lambda';

import productService from 'src/services/productService';
import { TProduct } from 'src/services/postgressProductService';

export const CatalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    try {
        const products = await Promise.all(event.Records.map(async ({ body }) => {
            const productInfo = JSON.parse(body);
            console.log(productInfo)
            const product = await productService.createProduct(productInfo as TProduct);
            return product;
        }));
        console.log('Success', products)
    } catch(err) {
        console.log('Error', err)
    }
};

export const main = middyfy(CatalogBatchProcess);
