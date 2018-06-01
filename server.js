const express = require('express');
const server = express();
const bodyParser = require('body-parser');
var connection = require('./src/config/db-mysql')

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/', (req, res) => {
    return res.send('Hello World!');
});

connection.init(function (conn) {
    /**
      * Handle exceptions that are not caught.
      *
      * In most cases, this is the only processing of a runtime error, for
      * example when trying to access an undefined variable. This handler
      * is particularly important, because it picks up coding errors.
      *
      * Note that this method will not get called when an exception
      * occurs with bluebird Promises.
    */
    server.on('uncaughtException', function (req, res, route, err) {
      console.log('v *************  EXCEPTION EXCEPTION EXCEPTION  *****************v')
      console.log('Uncaught exception:', err)
      console.log('Stack:\n', err.stack)
      console.log('^ ***************************************************************^')
      if (err instanceof Error) {
        // console.log('Is an Error')
        res.send(err)
      } else {
        // console.log('Not an Error')
        err = new errors.InternalServerError('A runtime error has been logged. Request probably failed.')
        res.send(err)
      }
    })
  
    // emailUtil.init(server);
    // emailUtil.sendMessage(server, templateUtil.templateName.event, null, function(){
    //     console.log("test");
    // });
  
    var port = process.env.PORT || 8080
    server.listen(port, function () {
      console.log('%s listening at %s', server.name, port)
    })
  
    // dbConnection = conn
    loadModules(server, conn, function (err, resp) {
      if (resp.status === 'success') {
        console.log('---Main Modules Activated----')
      }
    })
  })
  
  // function for loading modules
  function loadModules (server, dbConnection, callback) {
    var modules = require('./src/modules/api')
    modules.init(server, dbConnection)
    callback(null, { status: 'success' })
  }