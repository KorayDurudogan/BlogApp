class Constants {
    static users_collection = "users";
    static database_name = "BlogDb";
    static database_endpoint = 'mongodb://localhost:27017';
}

Object.freeze(Constants);

module.exports = { Constants }