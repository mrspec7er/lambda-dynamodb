const { v4 } = require("uuid");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const addData = async (event) => {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const { name, count } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  const body = {
    id,
    name,
    createdAt,
    count,
    status: true,
  };

  const command = new PutCommand({
    TableName: "TestingDB",
    Item: body,
  });

  const response = await docClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

module.exports = {
  addData: middy(addData).use(jsonBodyParser()),
};
