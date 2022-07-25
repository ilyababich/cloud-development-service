const documentation = {
    summary: 'getProductById',
    description: 'Get product by id',
    responses: {
        200: {
            description: 'Ok',
            bodyType: 'GetProductByIdSuccess',
        },
        404: {
            description: 'Not Found',
            bodyType: 'GetProductByIdFailed',
        }
    }
}

export default documentation