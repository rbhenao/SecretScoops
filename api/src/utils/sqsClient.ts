import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

// Explicitly load .env from the root of the API directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sqs = new AWS.SQS({
  endpoint: process.env.SQS_ENDPOINT, // Use local ElasticMQ
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
});

const QUEUE_URL = `${process.env.SQS_ENDPOINT}/queue/${process.env.SQS_QUEUE_NAME}`;

export { sqs, QUEUE_URL };