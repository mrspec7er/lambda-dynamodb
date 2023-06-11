const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

updateData = async (event) => {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);
  const { id } = event.pathParameters;

  const { name } = event.body;

  const command = new UpdateCommand({
    TableName: "TestingDB",
    Key: {
      id,
    },
    AttributeUpdates: {
      name: {
        Value: name,
        Action: "PUT",
      },
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

module.exports = {
  updateData: middy(updateData).use(jsonBodyParser()),
};
