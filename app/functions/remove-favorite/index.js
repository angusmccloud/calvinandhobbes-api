'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));

const dynamoScanAllRows = require('../dynamo-scan-all-rows');
const dynamoUpdateItem = require('../dynamo-update-item');

const removeFavorite = async (userId, comicId) => {
  console.log('Removing a favorite for', userId, comicId);

  const filterExpression = 'active = :active AND userId = :userId and comicId = :comicId';
  const expressionAttributeValues = {':active': true,':userId': userId, ':comicId': comicId};
  const tableName = process.env.FAVORITES_TABLE;
  const uniqueKey = 'favoriteId';
  const fields = 'favoriteId';

  const comicIds = await dynamoScanAllRows (tableName, fields, filterExpression, expressionAttributeValues, uniqueKey);

  for(let i = 0; i < comicIds.length; i++) {
    dynamoUpdateItem(tableName, 'favoriteId', comicIds[i].favoriteId, [{fieldName: 'active', value: false}]);
  }

  return `Removed on ${comicIds.length} records`;
};

module.exports = removeFavorite;