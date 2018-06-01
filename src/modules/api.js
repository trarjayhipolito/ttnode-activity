"use strict";

var user = require("./users/api");

module.exports.init = function init(server, dbConnection) {
    user.init(server, dbConnection);
};