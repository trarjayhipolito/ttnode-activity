'use_strict'
var logger = require('winston')
const TAG = 'PUT_user - '

exports.PUT_user = function (req, res, _dbConnection, next) {
  updateUser(req, res, _dbConnection, next)
}

//updataUser fn
//-------------
function updateUser (req, res, _dbConnection, next) {
  let body = req.body
  let sqlData = []
  //count body
  let count=0;
  for(let prop in body) {
      if (body.hasOwnProperty(prop)) {
         count++;
      }
  }

  //make update sql query
  let sqlQuery = ` UPDATE user_tbl 
                    SET `

  //add user_fname if not empty
  if (body.user_fname) {

    sqlQuery += ` user_fname = ?`
    sqlData.push(body.user_fname)

    //check if it is the only object
    if(count > 2){
      sqlQuery += `,`
      count--;
    }
  }
 
  //add user_lname if not empty
  if (body.user_lname) {
    sqlQuery += ` user_lname = ? `
    sqlData.push(body.user_lname)
    
    //check if it is the only object
    if(count > 2){
      sqlQuery += `,`
      count--;
    }
  }

  //add user_isdel if not empty
  //is user_isdel is one, delete.
  if (body.user_isdel) {
    sqlQuery += ` user_isdel = ? `
    sqlData.push(body.user_isdel)

    //check if it is the only object
    if(count > 2){
      sqlQuery += `,`
      count--;
    }
  }

  //add WHERE query
  sqlData.push(body.user_id)
  sqlQuery += ` WHERE user_id = ? `

  //callback function
  var sample =_dbConnection.query(sqlQuery, sqlData, function (err, result) {
    if (err) {
      let err = {}
      logger.log('error', TAG + 'updateUser Err : ' + err)
      err.status = '500'
      err.message = 'Internal Server Error'
      res.send(err)
    } else {
      let resp = {status: '200', user: sqlData}
      res.send(resp)
    }
  })

  console.log(sample.sql)

}
//-------------
