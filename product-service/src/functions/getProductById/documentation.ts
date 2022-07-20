const documentation = {
    summary: 'getProductById',
    description: 'Get product by id',
    responseData: {
        200: {
            description: 'Ok',
            bodyType: 'GetProductByIdSuccess',
        },
        404: {
            description: 'Not Found',
            bodyType: 'GetProductByIdFailed',
        },
        500: {
            description: 'Something went wrong!',
            bodyType: 'CommonFailed',
        }
    }
}

export default documentation