let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let muser = require('./../models/musers');
let mnotifications = require('./../models/mnotifications');

/* login user. */
router.all('/login', function (req, res, next) {
    //check if body is empty
    util.JSONChecker(res, req.body, (data) => {
        muser.findOne({where: {uemail: data.uemail, upass: sha1(data.upass)}})
            .then((user) => {
                if (user !== null) {
                    user.update({usession: md5(user.uid)});
                    //generate token
                    user = user.get({plain: true});
                    user.utoken = auth.Jsign(user, sha1(user.uid));
                    util.Jwr(res, true, user, "successful !");
                } else {
                    util.Jwr(res, false, {}, "Invalid user details !");
                }
            })
    }, false);
});

//load notifications
router.all('/notifications', function (req, res, next) {
    //check if body is empty
    util.JSONChecker(res, req.body, (data) => {
        mnotifications.findAll({where: {nuid: data.uid}, order: [['nid', 'DESC']]})
            .then((noti) => {
                if (noti !== null) {
                    util.Jwr(res, true, noti, "Loaded !");
                } else {
                    util.Jwr(res, false, {}, "Unable to load notifications !");
                }
            })
    }, false);
});
/* login user. */
router.all('/reset', function (req, res, next) {
    //check if body is empty
    util.JSONChecker(res, req.body, (data) => {
        muser.findOne({where: {uemail: data.uemail}})
            .then((user) => {
                if (user !== null) {
                    //password reset, send
                    user.upass = util.util.getRandomChar(10);

                } else {
                    util.Jwr(res, false, {}, "Invalid user details !");
                }
            })
    }, false);
});

/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign sha1 password
        data.upass = sha1(data.upass);
        muser.findOrCreate({where: {uemail: data.uemail}, defaults: data})
            .then(([user, created]) => {
                if (created) {
                    util.Jwr(res, true, user, "Newly created !");
                } else {
                    util.Jwr(res, false, user, "Email already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating users");
        })
    }, false)
});

/* user user. */
router.all('/update', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        muser.findOne({where: {uid: data.uid}})
            .then((user) => {
                if (user) {
                    //set if password exist
                    if (data.upass !== null && data.upass) {
                        data.upass = sha1(data.upass);
                    }
                    //apply new updates
                    user.update(data);
                    util.Jwr(res, true, user, "User records updated !");
                } else {
                    util.Jwr(res, false, user, "Unable to update non-existing user");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating users");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        muser.findOne({where: {uid: data.uid}})
            .then((user) => {
                util.Jwr(res, true, user, "User loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating users");
        })
    }, false)
});

/* Remove user */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        muser.destroy({where: {uid: data.uid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "User deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete user !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting users");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        muser.findAll({order: [['uid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All user listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list user !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening users");
        })
    }, true)
});

module.exports = router;