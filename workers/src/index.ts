import { sqs, QUEUE_URL, setVisibilityTimeout } from "./sqsClient";
import { processOrder } from "./processOrder";
import { Order } from "./types";

async function pollQueue() {
  const params = {
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 5,
  };

  try {
    const data = await sqs.receiveMessage(params).promise();

    if (data.Messages && data.Messages.length > 0) {
      for (const message of data.Messages) {
        try {
          const order: Order = JSON.parse(message.Body || "");

          console.log(`Processing order: ${order.id}`);

          if (message.ReceiptHandle) {
            await setVisibilityTimeout(message.ReceiptHandle, 120); // Extend timeout to 120 seconds
          }

          await processOrder(order);

          if (message.ReceiptHandle) {
            await sqs
              .deleteMessage({
                QueueUrl: QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle,
              })
              .promise();
            console.log(`Order #${order.id} processed and removed from queue.`);
          } else {
            console.warn("No valid ReceiptHandle found. Message not deleted.");
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      }
    } else {
      console.log("No new orders found.");
    }
  } catch (error) {
    console.error("Error polling SQS:", error);
  }
}

// Poll every 10 seconds
setInterval(pollQueue, 10000);

console.log("Worker is running and polling SQS...");