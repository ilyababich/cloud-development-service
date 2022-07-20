import { errorResponse, successResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from 'src/services/productService';

import schema from './schema';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

try {
    console.log(`CreateProduct: ${JSON.stringify(event.body)}`)
    const products = await productService.createProduct(event.body);
    return successResponse({products, event});
} catch(err) {
    return errorResponse(err);
}
};

export const main = middyfy(createProduct);