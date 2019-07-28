const AWS = require('aws-sdk');

const { response } = require('./helper');

const SQS = new AWS.SQS();

const QueueUrl = process.env.SQS_URL;
/**
 * This function create a new log and send to queue
 */
exports.handler = async (event, context) => {
  try {
    /**
     * Get all payload from body,
     */
    const { origin, type, message, params } = JSON.parse(event.body);

    /**
     * message is send to queue
     */
    await SQS.sendMessage({
      MessageBody: JSON.stringify({ origin, type, message, params }),
      QueueUrl
    }).promise();

    return response({
      status: true
    });
  } catch (error) {
    return response({ status: false, message: error.message }, 500);
  }
};
