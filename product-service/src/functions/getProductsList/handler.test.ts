// @ts-nocheck
import { formatJSONResponse } from "@libs/api-gateway";
import { getProductsList } from "./handler";

import productList from '@mocks/productList';

jest.mock('@libs/lambda');
jest.mock('@libs/api-gateway')

describe('getProductsList:handler', () => {
    it('should call formatJSONResponse with correct data', async () => {
        await getProductsList({});

        expect(formatJSONResponse).toBeCalledWith({
            products: productList,
            event: {},
        })
    })
})