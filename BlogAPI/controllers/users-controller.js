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

//fetchs all users except the loged in one.
router.get('/', function (req, res) {
    mongoDb.getDb().collection(Constants.users_collection).find({ _id: { $ne: ObjectId(req.userData._uid) } })
        .toArray((err, result) => {
            if (err) {
                MakeLogging(new Log(req.userData._uid, err));
                return res.status(404).send({ message: 'User fetching failed !' });
            }
            return res.status(200).send({ users: result });
        });
});

module.exports = { router }