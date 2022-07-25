// @ts-nocheck
import { formatJSONResponse } from "@libs/api-gateway";

import { getProductById } from "./handler";

jest.mock('@libs/lambda');
jest.mock('@libs/api-gateway')

describe('getProductById:handler', () => {
    it('should call formatJSONResponse with correct data if product exist', async () => {
        const event = {
            name: 'name',
            pathParameters: {
                id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa"
            }
        };

        await getProductById(event)

        expect(formatJSONResponse).toBeCalledWith({
            product: {
                "count": 4,
                "description": "Custom Short Product Description1",
                "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                "price": 2.4,
                "title": "ProductOne"
            },
            event,
        });
    });

    it('should call formatJSONResponse with correct data if product does not exist', async () => {
        const event = {
            name: 'name',
            pathParameters: {
                id: "fake-id"
            }
        };

        await getProductById(event)

        expect(formatJSONResponse).toBeCalledWith({
            message: 'Product Not Found!',
            event,
        }, 404);
    });
});