import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductById, createProduct, catalogButchProcess } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-auto-swagger', 'serverless-offline'],
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
      SNS_ARN: {
        Ref: 'createProductTopic',
      }
    },

    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: {
          "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
        }
      }, 
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: {
          Ref: "createProductTopic"
        }
      }
    ]  
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: "AWS::SQS::Queue",
      },
      createProductTopic: {
        Type: "AWS::SNS::Topic",
      },
      createProductSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "bilyha.ilya@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "createProductTopic" 
          }
        }
      }
    },
    Outputs: {
      queueUrl: {
        Value: "!Ref catalogItemsQueue",
      }
    }
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct, catalogButchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      host: '1hf6b7hpr5.execute-api.eu-west-1.amazonaws.com/dev/'
    }
  },
};

module.exports = serverlessConfiguration;
