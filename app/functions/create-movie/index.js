'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const createMovie = (contentObject) => {
  // console.log('Submitting Movie', contentObject);
  const dataInfo = {
    TableName: process.env.MOVIES_TABLE,
    Item: contentObject,
  };
  return dynamoDb.put(dataInfo).promise()
    .then(res => contentObject.movieId);
};

module.exports = createMovie;