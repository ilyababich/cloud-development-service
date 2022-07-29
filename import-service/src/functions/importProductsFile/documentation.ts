const documentation = {
    summary: 'importProductsFile',
    description: 'returns url for uploading files to s3',
    responseData: {
        200: {
            description: 'Ok',
            bodyType: 'importProductSuccess',
        },
        500: {
            description: 'Something went wrong!',
            bodyType: 'CommonFailed',
        }
    },
    queryStringParameters: {
        name: {
            required: true,
            type: 'string',
            description: 'name of file',
        }
    }
}

export default documentation