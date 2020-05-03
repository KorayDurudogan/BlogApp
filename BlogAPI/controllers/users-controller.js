const express = require('express');
const router = express.Router();
const mongoDb = require('../mongo-db');
const { ObjectId } = require('mongodb');
const MakeLogging = require('../shared/logging');
const Log = require('../models/log').Log;
const FollowUnfollowRequest = require('../models/requests/follow-unfollow-request').FollowUnfollowRequest;
const Constants = require('../constants').Constants;

//follows an user
router.put('/follow', function (req, res) {
    const request = new FollowUnfollowRequest(req.body.user_id);
    if (request.user_id) {
        mongoDb.getDb().collection(Constants.users_collection).updateOne({ _id: ObjectId(req.userData._uid) }, { $addToSet: { 'following': request.user_id } })
            .then(() => {
                return res.status(200).send({ message: 'success' });
            })
            .catch((error) => {
                MakeLogging(new Log(req.userData._uid, error));
                return res.status(400).send({ message: 'Following transaction failed !' });
            });
    }
    else {
        return res.status(404).send({ message: 'Request data was corrupted or not received !' });
    }
});

//unfollows an user
router.put('/unfollow', function (req, res) {
    const request = new FollowUnfollowRequest(req.body.user_id);
    if (request.user_id) {
        mongoDb.getDb().collection(Constants.users_collection).updateOne({ _id: ObjectId(req.userData._uid) }, { $pull: { 'following': request.user_id } })
            .then(() => {
                return res.status(200).send({ message: 'success' });
            })
            .catch((error) => {
                MakeLogging(new Log(req.userData._uid, error));
                return res.status(400).send({ message: 'Following transaction failed !' });
            });
    }
    else {
        return res.status(404).send({ message: 'Request data was corrupted or not received !' });
    }
});

function fetchFollowedUsers(req, following, res) {
    return new Promise((resolve, reject) => {
        mongoDb.getDb().collection(Constants.users_collection).find({ _id: { $in: following } })
            .toArray((err, result) => {
                if (err) {
                    MakeLogging(new Log(req.userData._uid, err));
                    reject(res.status(404).send({ message: 'Fetching feed failed !' }));
                }
                else {
                    result = result.map(function (u) {
                        return { _id: u._id, email: u.email, is_followed: true };
                    });
                    resolve(result);
                }
            });
    });
}

function fetchUnfollowedUsers(req, following, res) {
    return new Promise((resolve, reject) => {
        mongoDb.getDb().collection(Constants.users_collection).find({ $and: [{ _id: { $nin: following } }, { _id: { $ne: ObjectId(req.userData._uid) } }] })
            .toArray((err, result) => {
                if (err) {
                    MakeLogging(new Log(req.userData._uid, err));
                    reject(res.status(404).send({ message: 'Fetching feed failed !' }));
                }
                else {
                    result = result.map(function (u) {
                        return { _id: u._id, email: u.email, is_followed: false };
                    });
                    resolve(result);
                }
            });
    });
}

function fetchEveryoneExceptLogedIn(req, res) {
    return new Promise((resolve, reject) => {
        mongoDb.getDb().collection(Constants.users_collection).find({ _id: { $ne: ObjectId(req.userData._uid) } })
            .toArray((err, result) => {
                if (err) {
                    MakeLogging(new Log(req.userData._uid, err));
                    reject(res.status(404).send({ message: 'Fetching feed failed !' }));
                }
                else {
                    result = result.map(function (u) {
                        return { _id: u._id, email: u.email, is_followed: false };
                    });
                    resolve(result);
                }
            });
    });
}

//fetchs all users except the loged in one.
router.get('/', function (req, res) {
    mongoDb.getDb().collection(Constants.users_collection).findOne({ _id: { $eq: ObjectId(req.userData._uid) } })
        .then(async (result) => {
            let following = result.following;

            //if user has followings.
            if (following) {
                following = following.map(f => ObjectId(f));

                const [followed_users, unfollowed_users] = await Promise.all([
                    fetchFollowedUsers(req, following, res),
                    fetchUnfollowedUsers(req, following, res)
                ]);

                const sonuc = followed_users.concat(unfollowed_users);
                return res.status(200).send({ users: sonuc });
            }
            //if user doesnt follow anyone.
            else {
                const all_users_excep_logedin = await fetchEveryoneExceptLogedIn(req, res);
                return res.status(200).send({ users: all_users_excep_logedin });
            }
        })
        .catch((error) => {
            MakeLogging(new Log(req.userData._uid, error));
            return res.status(400).send({ message: 'Following transaction failed !' });
        });
});

module.exports = { router }