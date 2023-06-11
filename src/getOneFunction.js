const AWS = require("aws-sdk");
module.exports.getOneData = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  try {
    const data = await dynamoDB
      .get({ TableName: "TestingDB", Key: { id } })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
