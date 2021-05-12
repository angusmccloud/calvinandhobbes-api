'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const dynamoScanAllRows = require ('../dynamo-scan-all-rows');

const listAllMovies = async (service = netflix) => {
  console.log('Fetching List of Movies');

  const filterExpression = `objectType = :type AND adultFlag = :adultFlag`;
  const expressionAttributeValues = {':type': 'movie', ':adultFlag': false}
  const tableName = process.env.MOVIES_TABLE;
  const uniqueKey = 'movieId';
  const fields = `movieId, imdbId, tmdbId, ${service}`;

  let allMovies = await dynamoScanAllRows (tableName, fields, filterExpression, expressionAttributeValues, uniqueKey);

//  console.log(allMovies.length);

  return allMovies;
};

module.exports = listAllMovies;