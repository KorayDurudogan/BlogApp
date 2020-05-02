const ApiRequest = require('./api-request').ApiRequest;

//A request type that ideal for register and login transactions with email and password attributes.
class PostRequest extends ApiRequest {
    constructor(header, body, is_private, hashtags) {
        super();
        this.header = header;
        this.body = body;
        this.is_private = is_private
        this.hashtags = hashtags;
    }

    toJson() {
        return { head: this.header, body: this.body, is_private: this.is_private, hashtags: this.hashtags };
    }
}

module.exports = { PostRequest }