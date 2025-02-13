import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sqs = new AWS.SQS({
  endpoint: process.env.SQS_ENDPOINT, // Use local ElasticMQ
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
});

const QUEUE_URL = `${process.env.SQS_ENDPOINT}/queue/${process.env.SQS_QUEUE_NAME}`;

const setVisibilityTimeout = async (receiptHandle: string, timeout: number) => {
  try {
    await sqs
      .changeMessageVisibility({
        QueueUrl: QUEUE_URL,
        ReceiptHandle: receiptHandle,
        VisibilityTimeout: timeout,
      })
      .promise();
    console.log(`Visibility timeout extended to ${timeout} seconds.`);
  } catch (error) {
    console.error("Failed to update visibility timeout:", error);
  }
};

export { sqs, QUEUE_URL, setVisibilityTimeout };