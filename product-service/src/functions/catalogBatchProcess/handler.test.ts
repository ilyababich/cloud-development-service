import productService from "../../services/productService";
import { CatalogBatchProcess } from "./handler";


const productInfoMock = {
    title: 'Test',
    description: 'Test',
    price: '100',
    count: '2'
}

const stringifiedProductInfoMock = JSON.stringify(productInfoMock)

const eventMock = {
   Records: [{body: stringifiedProductInfoMock}]
};


const sendMock = jest.fn().mockResolvedValue('Resolved');

jest.mock('@aws-sdk/client-sns', () => ({
    SNSClient: jest.fn().mockImplementation(() => ({
        send: sendMock,
    })),
    PublishCommand: jest.fn().mockImplementation((arg) => arg) 
}));

jest.mock("../../services/productService", () => ({
    default: {
        createProduct: jest.fn().mockResolvedValue('Resolved')
    }
}));

jest.mock('@libs/lambda');

describe('catalogBatchProcess:handler', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = {
          ...originalEnv,
          SNS_ARN: 'arn',
        };
      });
      
      afterEach(() => {
        process.env = originalEnv;
      });
    it('should create product and send sns message', async () => {
        await CatalogBatchProcess(eventMock as any, {} as any, ()=> {});

        expect(productService.createProduct).toBeCalledWith({
            title: productInfoMock.title,
            description: productInfoMock.description,
            price: Number(productInfoMock.price),
            count: Number(productInfoMock.count)
        });

        expect(sendMock).toBeCalledWith({
            Message: stringifiedProductInfoMock,
            Subject: 'New product created',
            TopicArn: 'arn',
            MessageAttributes: {
                price: {
                DataType: "Number", 
                  StringValue: productInfoMock.price,
                }
            }
        })

    })
})