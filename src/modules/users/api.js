'use strict'
var logger = require('winston')

var DbConnectionError = require('../DbConnectionError')
var GET_user = require('./GET_user')
var GET_all_user = require('./GET_all_user')

module.exports.init = function init (server, dbConnection) {
    
    //GET USER REQUEST
    //----------------
    //get request by user id
    server.get('/api/user/:userId', function (req, res) {
        if (dbConnection.state === 'authenticated') {
            GET_user.GET_user(req, res, dbConnection)
            logger.log('info', 'done with GET_user.GET_user')
        } else {
            DbConnectionError.DbConnectionError(req, res)
        }
    })
    //get request all user
    server.get('/api/user', function (req, res) {
        if (dbConnection.state === 'authenticated') {
            GET_all_user.GET_all_user(req, res, dbConnection)
            logger.log('info', 'done with GET_all_user.GET_all_user')
        } else {
            DbConnectionError.DbConnectionError(req, res)
        }
    })
    //----------------


    //GET POST REQUEST
    //----------------
    //create user
    server.post('/api/user', function (req, res) {
        if (dbConnection.state === 'authenticated') {
            POST_user.POST_user(req, res, dbConnection)
        } else {
            DbConnectionError.DbConnectionError(req, res)
        }
    })
    //---------------
}