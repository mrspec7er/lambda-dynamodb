const AWS = require("aws-sdk");
module.exports.getData = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  try {
    const data = await dynamoDB.scan({ TableName: "TestingDB" }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
