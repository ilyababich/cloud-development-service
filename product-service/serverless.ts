import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductById, createProduct } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-webpack', 'serverless-auto-swagger', 'serverless-offline'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PGHOST:'${env:PGHOST}',
      PGUSER:'${env:PGUSER}',
      PGDATABASE:'${env:PGDATABASE}',
      PGPASSWORD:'${env:PGPASSWORD}',
      PGPORT:'${env:PGPORT}',
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: true,
      excludeFiles: 'src/**/*.test.ts'
    },
    autoswagger: {
      host: 'https://1hf6b7hpr5.execute-api.eu-west-1.amazonaws.com'
    }
  },
};

module.exports = serverlessConfiguration;
