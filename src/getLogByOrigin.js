const AWS = require('aws-sdk');

const { response } = require('./helper');

const DynamoDB = new AWS.DynamoDB.DocumentClient();

const TableName = process.env.DynamoDB_URL;

/**
 * Function to retrive log from SQS and save in DynamoDB
 */
exports.handler = async (event, context) => {
  try {
    const { origin } = event.queryStringParameters;

    const data = await DynamoDB.query({
      TableName,
      KeyConditionExpression: 'origin = :origin',
      ExpressionAttributeValues: {
        ':origin': origin
      }
    }).promise();
    return response(
      {
        status: true,
        body: data
      },
      200
    );
  } catch (error) {
    return response(
      {
        status: false,
        message: error.message
      },
      500
    );
  }
};
