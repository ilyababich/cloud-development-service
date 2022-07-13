import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import productList from '../../mocks/productList.json'

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    data: productList,
    event,
  });
};

export const main = middyfy(getProductsList);
