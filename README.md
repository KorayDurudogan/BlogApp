# BlogApp

App contains a Node.js API which uses MongoDb as database. You can find the database backup as BlogDbBackUp in this directory.
To restore the database, just run

        mongorestore --db BlogDb 'path-of-BlogDbBackUp'

in your command prompt.
You can change BlogDb and set another database name but remember to set the new name also in 'constants.js' file in the API.

You would probably want to use 'localhost:27017' for MongoDb which is the default port.
You can use another port but remember to change database endpoint in 'constants.js' if you willing to do that.

API using token authentication so make sure to set the given token in every request header except login and register.

API logging errors in 'system_logs.txt'.

Here are the provided endpoints:

        post -> /api/auth/login 
        post -> /api/auth/register
        put -> /api/users/follow (to follow another user)
        put -> /api/users/unfollow (to unfollow a followed user)
        get -> /api/users (fetchs all users except the loged in one)
        put -> /api/posts (publish a post)
        get -> /api/posts (see public posts of followed users and your all posts. Send with '?hashtag=..' param for hashtag filter.)

Angular8 used for front-end development. I used FlatLab Admin Template for styling.

# System

* Node v12.16.2
* Express v6.14.4

* MongoDb v4.2.6

* Angular v8.0.1
* TypeScript v3.4.3
* rxjs v6.4.0
* Bootstrap v3.1
