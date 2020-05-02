const ApiRequest = require('./api-request').ApiRequest;

//A request type that ideal for register and login transactions with email and password attributes.
class FollowUnfollowRequest extends ApiRequest {
    constructor(user_id) {
        super();

        //Id of the followed/unfollowed user.
        this.user_id = user_id;
    }
}

module.exports = { FollowUnfollowRequest }