import { errorResponse, successResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../services/productService';

import schema from './schema';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
try {
  console.log(`GetProductList: event - ${JSON.stringify(event)}`);
  const products = await productService.getProductList();

  return successResponse({products, event})
} catch (err) {
  errorResponse(err)
}
  
};

export const main = middyfy(getProductsList);
