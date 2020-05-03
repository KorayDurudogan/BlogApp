const express = require('express');
const router = express.Router();
const mongoDb = require('../mongo-db');
const { ObjectId } = require('mongodb');
const MakeLogging = require('../shared/logging');
const Log = require('../models/log').Log;
const PostRequest = require('../models/requests/post-request').PostRequest;
const Constants = require('../constants').Constants;
const PostIterator = require('../models/post_iterator').PostIterator;

//publish a post
router.put('/', function (req, res) {
    const request = new PostRequest(req.body.header, req.body.body, req.body.is_private, req.body.hashtags);
    if (request.header && request.body && request.is_private != null && req.body.hashtags) {
        mongoDb.getDb().collection(Constants.users_collection)
            .updateOne({ _id: ObjectId(req.userData._uid) }, { $addToSet: { 'posts': request.toJson() } })
            .then(() => { return res.status(200).send({ message: 'success' }); })
            .catch((error) => {
                MakeLogging(new Log(req.userData._uid, error));
                return res.status(400).send({ message: 'Following transaction failed !' });
            });
    }
    else {
        return res.status(404).send({ message: 'Request data was corrupted or not received !' });
    }
});

//get posts of followed people. Returns a promise.
function fetchFollowedPosts(req, following) {
    return new Promise((resolve, reject) => {
        mongoDb.getDb().collection(Constants.users_collection).find({ _id: { $in: following } })
            .toArray((err, result) => {
                if (err) {
                    MakeLogging(new Log(req.userData._uid, err));
                    reject(res.status(404).send({ message: 'Fetching feed failed !' }));
                }
                else {
                    let followedPosts = new PostIterator([]);
                    result.forEach((user) => {
                        //if user has any posts, filter publics and add to the post iterator.
                        if (user.posts) {
                            let filtered_posts = new PostIterator(user.posts.filter(e => !e.is_private));
                            followedPosts.add(filtered_posts.get_posts());
                        }
                    });
                    resolve(followedPosts);
                }
            });
    });
}

//see posts of followed users.
router.get('/', function (req, res) {
    mongoDb.getDb().collection(Constants.users_collection).findOne({ _id: ObjectId(req.userData._uid) })
        .then(async (result) => {
            try {
                var logedin_user_posts = new PostIterator(result.posts);

                //if user following other users, we are getting their posts too.
                if (result.following) {
                    let following = result.following.map(id => ObjectId(id));

                    await fetchFollowedPosts(req, following)
                        .then((followed_posts) => {
                            if (followed_posts)
                                logedin_user_posts.add(followed_posts.get_posts());
                        })
                        .catch((err) => {
                            MakeLogging(new Log(req.userData._uid, err));
                            return res.status(404).send({ message: 'Something went wrong ! Please try again later.' });
                        });
                }

                //filter for hashtag
                const hashtag = req.query.hashtag;
                if (hashtag)
                    logedin_user_posts.hashtag_filter(hashtag);

                return res.status(200).send({ posts: logedin_user_posts.get_posts() });
            } catch (err) {
                MakeLogging(new Log(req.userData._uid, err));
                return res.status(404).send({ message: 'Something went wrong ! Please try again later.' });
            }
        })
        .catch((err) => {
            MakeLogging(new Log(req.userData._uid, err));
            return res.status(404).send({ message: 'Fetching feed failed !' });
        });
});

module.exports = { router }