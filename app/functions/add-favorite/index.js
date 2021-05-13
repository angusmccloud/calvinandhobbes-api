'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid');

const dynamoCreateItem = require('../dynamo-create-item');

const addFavorite = async (userId, comicId) => {
  console.log('Adding a favorite for', userId, comicId);

  const timestamp = new Date().getTime(); 

  const created = await dynamoCreateItem(
    process.env.FAVORITES_TABLE, 
    'favoriteId', 
    {favoriteId: uuid.v1(), comicId: comicId, userId: userId, createdTime: timestamp, updatedTime: timestamp, active: true}
  );

  return created;
};

module.exports = addFavorite;