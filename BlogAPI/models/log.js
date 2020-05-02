class Log {
    constructor(user_id, error) {
        this.date = new Date();
        this.user_id = user_id;
        this.error = error;
    }

    getErrorMessage() {
        return "\r\n" + "Date: " + this.date + "\r\n" + "User: " + this.user_id + "\r\n" + "Error: " + this.error.stack + "\r\n";
    }
}

module.exports = { Log }