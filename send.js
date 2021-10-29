'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

let send = () => {
    var params = {
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
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    // MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/281742839611/MyQueue"
    };
    
    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
}

send()