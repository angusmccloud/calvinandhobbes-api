'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const dynamoScanAllRows = require ('../dynamo-scan-all-rows');

const listAllFavorites = async (userId) => {
  console.log('Fetching List of Favorites for', userId);

  const filterExpression = 'active = :active and userId = :userId';
  const expressionAttributeValues = {':active': true, ':userId': userId}
  const tableName = process.env.FAVORITES_TABLE;
  const uniqueKey = 'favoriteId';
  const fields = 'favoriteId, comicId';

  let allFavorites = await dynamoScanAllRows (tableName, fields, filterExpression, expressionAttributeValues, uniqueKey);

  return allFavorites;
};

module.exports = listAllFavorites;