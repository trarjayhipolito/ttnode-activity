'use_strict'
var logger = require('winston')
const TAG = 'PUT_user - '

exports.PUT_user = function (req, res, _dbConnection, next) {
  updateUser(req, res, _dbConnection, next)
}

function updateUser (req, res, _dbConnection, next) {
  let body = req.body
  let sqlData = [body.user_name, body.user_auth, body.user_id]
  let sqlQuery =` UPDATE user_tbl 
                    SET user_name = ?, 
                        user_auth = ? 
                  WHERE user_id = ? `
  _dbConnection.query(sqlQuery, sqlData, function (err, result) {
    if (err) {
      let err = {}
      logger.log('error', TAG + 'updateUser Err : ' + err)
      err.status = '500'
      err.message = 'Internal Server Error'
      res.send(err)
    } else if (sqlData[0] == '') {
      let resp = {status: '204', user_id: 'User Name is Empty'}
      res.send(resp)
    } else if (sqlData[1] == '') {
      let resp = {status: '204', user_id: 'User Authentication is Empty'}
      res.send(resp)
    }else {
      let resp = {status: '204', user_id: sqlData}
      res.send(resp)
    }
  })
}
