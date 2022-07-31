import { mock as AWSMock } from 'aws-sdk-mock';
import { Context } from 'aws-lambda';
import { BUCKET_NAME, UPLOADED_FOLDER } from '../../consts';
import { importProductsFile } from './handler';
import { errorResponse, successResponse } from '@libs/api-gateway';

jest.mock('@libs/api-gateway');

describe('importProductsFile', () => {
    it('returns correct signed url', async () => {
        const mockEvent = {
            queryStringParameters: {
                name: 'mock.csv'
            }
        } as any;

        AWSMock('S3', 'getSignedUrl', (operation: string, params: any, callback: Function) => {
            expect(operation).toEqual('putObject');
            expect(params).toEqual({
                Bucket: BUCKET_NAME,
                Key: `${UPLOADED_FOLDER}/mock.csv`,
                Expires: 3600,
                ContentType: 'txt/csv',
            })
            callback(null, 'signedUrl');
        });

        await importProductsFile(mockEvent, {} as Context, jest.fn());


        expect(successResponse).toBeCalledWith({url: "signedUrl"})
    });

    it('return error if something goes wrong', async () => {
        AWSMock('S3', 'getSignedUrl', () => {});

        await importProductsFile({} as any, {} as Context, jest.fn());


        expect(errorResponse).toBeCalledWith(expect.any(Error))
    });
})