import { errorResponse, successResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../services/productService';

import schema from './schema';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

try {
    console.log(`CreateProduct: event - ${JSON.stringify(event)}`)
    const products = await productService.createProduct(event.body);
    return successResponse({products, event});
} catch(err) {
    return errorResponse(err);
}
};

export const main = middyfy(createProduct);