'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'ap-southeast-1', apiVersion: '2012-11-05' });

let receive = (event) => {
    var queueURL = "https://sqs.ap-southeast-1.amazonaws.com/281742839611/MyQueue";
console.log(event)
    var params = {
        AttributeNames: [
            "SentTimestamp"
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: queueURL,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0
    };

    sqs.receiveMessage(params, function(err, data) {
        if (err) {
            console.log("Receive Error", err);
        } else if (data.Messages) {
            console.log(data.Messages)
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle
            };
            sqs.deleteMessage(deleteParams, function(error, delData) {
            if (error) {
                console.log("Delete Error", error);
            } else {
                console.log("Message Deleted", delData);
            }
            });
        } else {
            console.log(data)
        }
    });
}

receive()