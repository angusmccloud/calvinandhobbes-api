'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const addFavorite = require('../functions/add-favorite');
const removeFavorite = require('../functions/remove-favorite');

module.exports.sqsHandler = async (event, context, callback) => {
  /** Immediate response for WarmUP plugin so things don't keep running */
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUP - Lambda is warm!')
    return callback(null, 'Lambda is warm!')
  }

  console.log('-- Event --', event);
  const body = JSON.parse(event.Records[0].body);
  const actionType = body.actionType;
  const userId = body.userId;
  
  console.log("text: ", body);
  console.log("---- Body Above ----");
  console.log("SQS Handler Function Running!");

  if(actionType === 'favoriteAdd') {
    console.log('-- Add Favorites --');
    const added = await addFavorite(userId, body.comicId);
    console.log('-- Added Favorite --', added);
    return "true";
  } else if(actionType === 'favoriteRemove') {
    console.log('-- Remove Favorites --');
    const removed = await removeFavorite(userId, body.comicId);
    console.log('-- Removed Favorite --', removed);
    return "true";
  }

  var response = {
    statusCode: 200,
    headers: {
        'Content-Type': 'application/json'
    },
    body: ''
  };
  callback(null, response);
};
