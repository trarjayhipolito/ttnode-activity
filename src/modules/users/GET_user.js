var logger = require('winston');
const TAG = 'GET_user - '

exports.GET_user = function(req, res, _dbConnection){
    //initialize database connection
    dbConnection = _dbConnection;

    //initialize response
    var resp;

    //fetch userId in parameter
    var params  = {
        userId: req.params.userId
    };

    //Call get user fn
    getUser(params, function(err, user){
        //check the server
        if (err){
            let err = {}
            err.status = '500'
            err.message = 'Internal Server Error'
            res.send(err)
        }

        //check if there's fetched data
        if (user !== null){
            resp = {status: "200", user: user};
        } else {
            resp = {status: "204", message: "No Data Available!"};
        }

        //send response
        res.send(resp);

    });

    // return next();

};

//getUser fn
//-------------
function getUser(params, callback) {
    //declare userId
    var userId = params.userId;

    //sql command
    var sql = 'SELECT * FROM user_tbl WHERE user_id=' + userId;

     //executing sql
     dbConnection.query(sql, function(err, recordset){
        //check error on fetching
        if (err) {
            logger.log('error', TAG + 'getUser Error : ' + err);
            callback(err, null);
        }

        //initalize userResponse
        var userRes = null;
        
        //check if there's record
        if (recordset.length !== 0){
            //save record
            userRes = {
                user_id: recordset[0].user_id,
                user_name: recordset[0].user_name,
                user_auth: recordset[0].user_auth,
            };
        }
        
        //return User record
        callback(null,userRes);
    });

}

