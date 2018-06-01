var  mysql = require("mysql"),
    config = require("./db-mysql-config");

/**
 * Initialize database connection
 */

exports.init = function (connect_callback) {
    console.log("Initialising module db-mysql");
    initializeConnection(connect_callback);
};

//configuration checking
if(!config) {
    console.log('-----------------------------------------------------------------------------');
    console.log('ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR');
	console.log('');
	console.log('');
    console.log('     FATAL ERROR:');
	console.log('     No database configuration found!!!');
    console.log('');
	console.log('     Shutting down server...');
	console.log('');
	console.log('');
	console.log('ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR');
	console.log('-----------------------------------------------------------------------------');
    process.exit(1);
}

// Function call for database connection
function initializeConnection(connect_callback/*(connection)*/) {

    console.log(config.database);
	console.log('Connecting to mysql');
	console.log('  host=' + config.database.server);
	console.log('  database=' + config.database.database);
	console.log('  user=' + config.database.user);
	console.log('  options=' + config.database.options);
	console.log('');

	console.log("Initialising module connection");
	var connection = mysql.createConnection({
        user: config.database.user,
        password: config.database.password,
        host: config.database.server,
        database: config.database.database,
        port:config.database.port,
        options: config.database.options
	});
	connection.connect();
	connect_callback(connection);

}