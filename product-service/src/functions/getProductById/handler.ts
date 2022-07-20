import { errorResponse, successResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../services/productService';

import schema from './schema';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {
    const {id: productId} = event.pathParameters;

    console.log(`GetProductById: ${JSON.stringify(event.pathParameters)}`)
    const product = await productService.getProductById(productId);
  
    if (!product) {
      return successResponse({message: 'Product Not Found!'}, 404)
    }


    return successResponse({product, event})
  } catch (error) {
    return errorResponse(error)
  }
  
};

export const main = middyfy(getProductById);
