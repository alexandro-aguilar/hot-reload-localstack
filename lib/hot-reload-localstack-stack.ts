import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { resolve } from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HotReloadLocalstackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Function(this, 'HotReloadFunction', {
      functionName: 'HotReloadFunction',
      runtime: Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: Code.fromBucket(Bucket.fromBucketName(this, 'HotReloadBucket', 'hot-reload'), resolve(__dirname, '../.dist/src/')),
      environment: { NODE_ENV: 'local' },
    });
    console.log(resolve(__dirname, '../.dist/src/'));
  }
}
