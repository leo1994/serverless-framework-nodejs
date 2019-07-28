const AWS = require('aws-sdk');

const { response } = require('./helper');

const DynamoDB = new AWS.DynamoDB.DocumentClient();

const TableName = process.env.DynamoDB_URL;

/**
 * Function to retrive log from SQS and save in DynamoDB
 */
exports.handler = async (event, context) => {
  try {
    /**
     * Verify if queryString exist
     */
    const { queryStringParameters } = event;
    if (!queryStringParameters || !queryStringParameters['origin']) {
      return response(
        {
          status: false,
          message: 'Querystring `origin` is required'
        },
        500
      );
    }

    /**
     * Query for data in dynamoDB
     */
    const data = await DynamoDB.query({
      TableName,
      KeyConditionExpression: 'origin = :origin',
      ExpressionAttributeValues: {
        ':origin': queryStringParameters.origin
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
