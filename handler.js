'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const AWS_ACCOUNT = process.env.ACCOUNT_ID
const AWS_REGION = process.env.AWS_REGION
const CONSELOR_QUEUE = process.env.CONSELOR_QUEUE
const QUEUE_URL = `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT}/${CONSELOR_QUEUE}`

module.exports.hello = async (event) => {
  if (event.queryStringParameters) {
    console.log(event.queryStringParameters)
    console.log(JSON.stringify(event.queryStringParameters))
  }
  try {
    const params = {
      // Remove DelaySeconds parameter and value for FIFO queues
      DelaySeconds: 10,
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "The Whistler"
        },
        "Author": {
          DataType: "String",
          StringValue: "John Grisham"
        },
        "WeeksOn": {
          DataType: "Number",
          StringValue: "6"
        }
      },
      MessageBody: JSON.stringify({ name: "Hello Senthur!" }),
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl: QUEUE_URL
    }

    const response = await sqs.sendMessage(params).promise()
    console.log('data:', response.MessageId)

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'ERROR'
      })
    }
  }
}

module.exports.sqsHello = async (event) => {
  console.log("messageAttributes: " + JSON.stringify(event.Records[0].messageAttributes))
  console.log("body json: " + JSON.parse(event.Records[0].body).name)
}