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
     * Verify if queryString exist and if value is valid
     */
    const { queryStringParameters } = event;

    if (!queryStringParameters || !queryStringParameters.type) {
      return response(
        {
          status: false,
          message: 'Querystring `type` is required'
        },
        500
      );
    } else if (
      !['log', 'warn', 'error', 'custom'].includes(queryStringParameters.type)
    ) {
      return response(
        {
          status: false,
          message: '`type` should be: log | warn | error | custom'
        },
        500
      );
    }

    /**
     * Query for data in dynamoDB
     */
    const data = await DynamoDB.query({
      TableName,
      IndexName: 'typeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'type'
      },
      ExpressionAttributeValues: {
        ':type': queryStringParameters.type
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
