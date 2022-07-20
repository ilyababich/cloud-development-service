const documentation = {
    summary: 'getProductsList',
    description: 'Get products list',
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