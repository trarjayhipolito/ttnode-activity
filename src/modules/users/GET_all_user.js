var logger = require('winston')
const TAG = 'GET_all_user - '

exports.GET_all_user = function(req, res, _dbConnection){
    dbConnection = _dbConnection;
    var resp;

    var params  = {
        userId: req.params.userId
    };

    getAllUser(params, function(err, allUser){
        if (err){
            let err = {}
            err.status = '500'
            err.message = 'Internal Server Error'
            res.send(err)
        }

         if (allUser.length !== 0) {
            resp = {status: "200", allUser: allUser};
        } else {
            resp = {status: "204", message: "No Data Available!"};
        }

        res.send(resp);

    });

};

function getAllUser(params, callback) {

    var userId = params.userId;

    var sql = 'SELECT * FROM user_tbl';

    var values = [userId];

     //executing sql
     dbConnection.query(sql, values, function(err, recordset){
        if (err) {
            logger.log('error', TAG + 'getallUsers Err : ' + err);
            callback(err, null);
        }
        var allUserList = [];
        for (var index in recordset){

            var allUser = {
                user_id: recordset[index].user_id,
                user_name: recordset[index].user_name,
                user_auth: recordset[index].user_auth,
            };
            allUserList.push(allUser);
        }
        
        callback(null,allUserList);
    });
}