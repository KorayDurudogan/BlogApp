const fs = require('fs');
var path = require('path');

//Makes logging.
module.exports = function MakeLogging(log) {
    let log_file_path = path.join(__dirname, '../system_logs.txt');
    fs.appendFile(log_file_path, log.getErrorMessage(), function (err, data) {
        if (err) throw err;
    });
}
