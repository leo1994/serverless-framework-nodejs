const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const DynamoDB = new AWS.DynamoDB.DocumentClient();

const TableName = process.env.DynamoDB_URL;

/**
 * Function to retrive log from SQS and save in DynamoDB
 */
exports.handler = async (event, context) => {
  try {
    const { body, attributes } = event.Records[0];

    const { origin, type, message, params } = JSON.parse(body);
    const { SentTimestamp: timestamp } = attributes;

    const data = DynamoDB.put({
      TableName,
      Item: { logId: uuid(), origin, type, message, params, timestamp }
    }).promise();
    return data;
  } catch (error) {
    return error;
  }
};
