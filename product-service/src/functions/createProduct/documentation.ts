const documentation = {
    summary: 'getProductById',
    description: 'Get product by id',
    bodyType: 'CreateProduct',
    responses: {
        200: {
            description: 'Ok',
            bodyType: 'GetProductsList',
        },
        500: {
            description: 'Something went wrong!',
            bodyType: 'CommonFailed',
        }
    }
}

export default documentation