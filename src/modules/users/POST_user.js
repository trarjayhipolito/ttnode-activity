'use_strict'
const logger = require('winston')
const TAG = 'POST_user - '
const async = require('async')

exports.POST_user = function (req, res, _dbConnection) {
    //Call insert user fn
    insertUser(req, res, _dbConnection, function (err, result){
        if (err) {
            let err = {}
            err.status = '500'
            err.message = 'Internal Server Error'
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

//InsertUser fn
//--------------
function insertUser(req, res, _dbConnection, callback) {
    //initialize database connection
    var dbConnection = _dbConnection;

    //initialize response
    var resp;
    
    //if any of the functions pass an error to the callback 
    //the next function is not executed and the main callback is immediately called with the error
    async.waterfall([
        function (callback) {
            putUser(dbConnection, req.body, function(err, result){
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.insertId);
                }
            });
        }
    ],
    //main callback function
    function (err, userId) {
        if (err) {
            callback(err, null)
        } else if (req.body.user_name == '') {
            let resp = {status: '204', user_id: 'User Name is Empty'}
            res.send(resp)
        } else if (req.body.user_auth == '') {
            let resp = {status: '204', user_id: 'User Authentication is Empty'}
            res.send(resp)
        } else {
            resp = {status: "204", userId: userId};
            callback(null, resp);
        }
    })
}
//--------------


//putUser fn
//--------------
function putUser(dbConnection, body, callback) {
    let sqlData = [body.user_name, body.user_auth];
    let sqlQuery = 'INSERT INTO user_tbl (user_name, user_auth) ' +
                    'VALUES (?, ?)';

    dbConnection.query(sqlQuery, sqlData, function(err, result) {
        if (err) {
            logger.log('error', TAG + 'putUser Err : ' + err)
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
//--------------