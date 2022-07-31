// @ts-nocheck
import { successResponse, errorResponse } from "@libs/api-gateway";

import { getProductById } from "./handler";

jest.mock('@libs/lambda');
jest.mock('@libs/api-gateway');

jest.mock('../../services/productService', () => ({
    default: {
        getProductById: jest.fn().mockResolvedValueOnce(
            {
                "count": 4,
                "description": "Custom Short Product Description1",
                "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                "price": 2.4,
                "title": "ProductOne"
            },
        ).mockResolvedValueOnce(null).mockRejectedValue(new Error('Error'))
    }
}))

describe('getProductById:handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('should call successResponse with correct data if product exist', async () => {
        jest.mock('../../services/productService', () => ({
            default: {
                getProductById: jest.fn().mockResolvedValueOnce(
                    {
                        "count": 4,
                        "description": "Custom Short Product Description1",
                        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                        "price": 2.4,
                        "title": "ProductOne"
                    },
                ).mockResolvedValueOnce(null).mockRejectedValue(new Error('Error'))
            }
        }))
        const event = {
            name: 'name',
            pathParameters: {
                id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa"
            }
        };

        await getProductById(event)

        expect(successResponse).toBeCalledWith({
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
    it('should call successResponse with correct data if product does not exist', async () => {
        const event = {
            name: 'name',
            pathParameters: {
                id: "fake-id"
            }
        };

        await getProductById(event)

        expect(successResponse).toBeCalledTimes(1);
    });
    it('should call errorResponse if failed', async () => {
        const event = {
            name: 'name',
            pathParameters: {
                id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa"
            }
        };

        await getProductById(event);

        expect(errorResponse).toBeCalledWith(new Error('Error'))
    })
});