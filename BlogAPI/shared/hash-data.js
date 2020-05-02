//Hashes important data like password.
module.exports = function hashData(data) {
    return require("crypto").createHash('md5').update(data).digest("hex");
}