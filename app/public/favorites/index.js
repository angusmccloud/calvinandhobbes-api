'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoFetchSingleItem = require('../../functions/dynamo-fetch-single-item');
const dynamoCreateItem = require('../../functions/dynamo-create-item');
const dynamoUpdateItem = require('../../functions/dynamo-update-item');
const formatMovieObject = require('../../functions/format-movie-object');
const getUserId = require('../../functions/getUserId/getUserId');

module.exports.list = async (event, context, callback) => {
    /** Immediate response for WarmUP plugin so things don't keep running */
    if (event.source === 'serverless-plugin-warmup') {
        console.log('WarmUP - Lambda is warm!')
        return callback(null, 'Lambda is warm!')
    }

    const timestamp = new Date().getTime();
    const jwtToken = event.headers.jwtHeader;
    const submittingUserId = await getUserId(jwtToken);

    let anyErrors = false;
    let errorsText = '';
    if (requestBody.userId === undefined) {
        anyErrors = true;
        errorsText = 'Invalid request parameters, must include userId';
        console.log('Missing a field');
    } 

    if (anyErrors) {
        console.log('There are errors', errorsText);
        const response = {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(errorsText)
        };

        callback(null, response);
    } else {
        console.log('No Errors');

        // await dynamoUpdateItem(process.env.USERS_TABLE, 'userId', submittingUserId, updatedValues);

        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("Here's a List!")
        };

        callback(null, response);
    }
};

module.exports.add = async (event, context, callback) => {
    /** Immediate response for WarmUP plugin so things don't keep running */
    if (event.source === 'serverless-plugin-warmup') {
        console.log('WarmUP - Lambda is warm!')
        return callback(null, 'Lambda is warm!')
    }

    const timestamp = new Date().getTime();
    const jwtToken = event.headers.jwtHeader;
    const submittingUserId = await getUserId(jwtToken);

    let anyErrors = false;
    let errorsText = '';
    if (requestBody.userId === undefined) {
        anyErrors = true;
        errorsText = 'Invalid request parameters, must include userId';
        console.log('Missing a field');
    } 

    if (anyErrors) {
        console.log('There are errors', errorsText);
        const response = {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(errorsText)
        };

        callback(null, response);
    } else {
        console.log('No Errors');

        // await dynamoUpdateItem(process.env.USERS_TABLE, 'userId', submittingUserId, updatedValues);

        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("Added Successfully")
        };

        callback(null, response);
    }
};


module.exports.remove = async (event, context, callback) => {
    /** Immediate response for WarmUP plugin so things don't keep running */
    if (event.source === 'serverless-plugin-warmup') {
        console.log('WarmUP - Lambda is warm!')
        return callback(null, 'Lambda is warm!')
    }

    const timestamp = new Date().getTime();
    const jwtToken = event.headers.jwtHeader;
    const submittingUserId = await getUserId(jwtToken);

    let anyErrors = false;
    let errorsText = '';
    if (requestBody.userId === undefined) {
        anyErrors = true;
        errorsText = 'Invalid request parameters, must include userId';
        console.log('Missing a field');
    } 

    if (anyErrors) {
        console.log('There are errors', errorsText);
        const response = {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(errorsText)
        };

        callback(null, response);
    } else {
        console.log('No Errors');

        // await dynamoUpdateItem(process.env.USERS_TABLE, 'userId', submittingUserId, updatedValues);

        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("Delete Successfully")
        };

        callback(null, response);
    }
}
