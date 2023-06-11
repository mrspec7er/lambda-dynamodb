const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
module.exports.deleteData = async (event) => {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);
  const { id } = event.pathParameters;

  const command = new DeleteCommand({
    TableName: "TestingDB",
    Key: {
      id,
    },
  });

  const response = await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
