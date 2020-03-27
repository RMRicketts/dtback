'use strict';

const aws = require('aws-sdk');
const configs = require('../../configs/config.js');
const aws_env = process.env === 'production' ? 'dt_prod' : 'dt_dev';
const credentials = new AWS.SharedIniFileCredentials({profile: aws_env});
aws.config.credentials = credentials;
aws.config.update({region: 'us-west-2'});
const s3 = new aws.s3();

module.exports = async server => {
  
};
