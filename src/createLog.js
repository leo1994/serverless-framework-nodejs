const AWS = require('aws-sdk');
const SQS = new AWS.SQS({
  region: 'us-east-1'
});

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
      QueueUrl: process.env.SQS_URL
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: JSON.stringify({ error })
      })
    };
  }
};
