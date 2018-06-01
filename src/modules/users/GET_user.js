var logger = require('winston');
const TAG = 'GET_user - '

exports.GET_user = function(req, res, _dbConnection){
    dbConnection = _dbConnection;
    var resp;

    var params  = {
        userId: req.params.userId
    };

    getUser(params, function(err, user){
        if (err){
            let err = {}
            err.status = '500'
            err.message = 'Internal Server Error'
            res.send(err)
        }
        if (user !== null){
            resp = {status: "200", user: user};
        } else {
            resp = {status: "204", message: "No Data Available!"};
        }

        res.send(resp);

    });

    // return next();

};

function getUser(params, callback) {

    var userId = params.userId;
    var sql = 'SELECT * FROM user_tbl WHERE user_id=' + userId;

    var values = [userId];

     //executing sql
     dbConnection.query(sql, values, function(err, recordset){
        if (err) {
            logger.log('error', TAG + 'getUser Error : ' + err);
            callback(err, null);
        }
        var userRes = null;
        
        if (recordset.length !== 0){
            userRes = {
                user_id: recordset[0].user_id,
                user_name: recordset[0].user_name,
                user_auth: recordset[0].user_auth,
            };
        }
        
        callback(null,userRes);
    });
}

