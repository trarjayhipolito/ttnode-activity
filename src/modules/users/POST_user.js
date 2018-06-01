'use_strict'

const logger = require('winston')
const TAG = 'POST_user - '
const async = require('async')

exports.POST_user = function (req, res, _dbConnection) {
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

function insertUser(req, res, _dbConnection, callback) {
    var dbConnection = _dbConnection;
    var resp;
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
      function (err, userId) {
          if (err) {
              callback(err, null)
          } else {
              resp = {status: "204", userId: userId};
              callback(null, resp);
          }
      })
}
function putUser(dbConnection, body, callback) {
    let sqlData = [body.firstName, body.lastName, body.email, 'E', 'I', 'system'];
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