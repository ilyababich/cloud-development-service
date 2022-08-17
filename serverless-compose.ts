const serverlessConfiguration = {
  services: {
    "product-service" : {
      path: 'product-service',
    },
    'import-service': {
      path: 'import-service',
      params: {
        queueUrl: '${product-service.queueUrl}'
      }
    }
  }
};

module.exports = serverlessConfiguration;
