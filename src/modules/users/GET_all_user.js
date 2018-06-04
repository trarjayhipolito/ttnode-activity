var logger = require('winston')
const TAG = 'GET_all_user - '

exports.GET_all_user = function(req, res, _dbConnection){
    //initialize database connection
    dbConnection = _dbConnection;

    //initialize response
    var resp;

    //Call get ALL user fn
    getAllUser(function(err, allUser){
        //check the server
        if (err){
            let err = {}
            err.status = '500'
            err.message = 'Internal Server Error'
            res.send(err)
        }

        //check if there's fetched data
        if (allUser.length !== 0) {
            resp = {status: "200", allUser: allUser};
        } else {
            resp = {status: "204", message: "No Data Available!"};
        }

        //send response
        res.send(resp);

    });

};

//getAllUser fn
//-------------
function getAllUser(callback) {
    //sql command
    var sql = 'SELECT * FROM user_tbl WHERE user_isdel = 0';
     //executing sql
    dbConnection.query(sql, function(err, recordset){
        //check error on fetching
        if (err) {
            logger.log('error', TAG + 'getallUsers Err : ' + err);
            callback(err, null);
        }
        //initialize user list array
        var allUserList = [];

        //loop for each record in user table
        for (var index in recordset){
            //save each record in object
            var allUser = {
                user_id: recordset[index].user_id,
                user_name: recordset[index].user_name,
                user_auth: recordset[index].user_auth,
            };
            //push record in array
            allUserList.push(allUser);
        }

        //returns User list
        callback(null, allUserList);
    });
}
//------------