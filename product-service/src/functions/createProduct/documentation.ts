const documentation = {
    summary: 'createProduct',
    description: 'creates product',
    bodyType: 'CreateProduct',
    responseData: {
        200: {
            description: 'Ok',
            bodyType: 'GetProductByIdSuccess',
        },
        400: {
            description: 'Invalid request body',
            bodyType: 'CommonFailed',
        },
        500: {
            description: 'Something went wrong!',
            bodyType: 'CommonFailed',
        }
    }
}

export default documentation