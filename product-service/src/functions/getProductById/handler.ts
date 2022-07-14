import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import productList from '@mocks/productList';

import schema from './schema';

const getProductList = async () => {
  return Promise.resolve(productList);
}

export const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const {id: productId} = event.pathParameters;

  const products = await getProductList();

  const product = products && products.find((el) => el.id === productId)

  if (!product) {
    return formatJSONResponse({
      message: 'Product Not Found!',
      event,  
    }, 404)
  }

  return formatJSONResponse({
    product,
    event,
  });
};

export const main = middyfy(getProductById);
