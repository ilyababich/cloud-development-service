// @ts-nocheck
import { errorResponse, successResponse } from "@libs/api-gateway";
import productService from "../../services/productService";
import { createProduct } from "./handler";

jest.mock('@libs/lambda');
jest.mock('@libs/api-gateway');

jest.mock('../../services/productService', () => ({
    default: {
        createProduct: jest.fn().mockResolvedValueOnce([
            {
                "count": 4,
                "description": "Custom Short Product Description1",
                "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                "price": 2.4,
                "title": "ProductOne"
              },
              {
                "count": 6,
                "description": "Custom Short Product Description3",
                "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
                "price": 10,
                "title": "ProductNew"
              },
        ]).mockRejectedValue(new Error('Error'))
    }
}));

const event = {
    body: {
        title: 'title',
        description: 'description',
        price: 1,
        count: 1
    }
}

describe('createProduct:handler', () => {
    it('should call successResponse with correct data', async () => {
        await createProduct(event);

        expect(productService.createProduct).toHaveBeenCalledWith(event.body)

        expect(successResponse).toBeCalledWith({
            products: [
                {
                    "count": 4,
                    "description": "Custom Short Product Description1",
                    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                    "price": 2.4,
                    "title": "ProductOne"
                  },
                  {
                    "count": 6,
                    "description": "Custom Short Product Description3",
                    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
                    "price": 10,
                    "title": "ProductNew"
                  },
            ],
            event,
        })
    });

    it('should call errorResponse if failed', async () => {
        await createProduct(event);

        expect(errorResponse).toBeCalledWith(new Error('Error'))
    })
})