import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import productList from '../../mocks/productList.json'

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const {id: productId} = event.pathParameters;
  const product = productList.find((el) => el.id === productId)

  return formatJSONResponse({
    product: product,
    event,
  });
};

export const main = middyfy(getProductById);
