let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let modules = require('./../models/modules');
let activities = require('./../models/activities');
let purchase = require('./../models/mpurchase');
let muser = require('./../models/musers');

/* list module. */
router.all('/list', function (req, res, next) {
    //check if body is empty
    util.JSONChecker(res, req.body, (data) => {
        modules.findAll({order: [['mid', 'DESC']], include: [{model: activities, as: 'activities'}]})
            .then((module) => {
                if (module !== null) {
                    util.Jwr(res, true, module, "successful !");
                } else {
                    util.Jwr(res, false, {}, "Invalid user details !");
                }
            }).catch(err => {
            util.Jwr(res, false, {}, "Something bas has happened, try again !");
        })
    }, true);
});

/* list module purchases. */
router.all('/buy/list', function (req, res, next) {
    //check if body is empty
    util.JSONChecker(res, req.body, (data) => {
        purchase.findAll({
            where: {puid: data.uid},
            order: [['pid', 'DESC']],
            include: [{model: modules, as: 'module', include: [{model: activities, as: 'activities'}]}, {
                model: muser,
                as: 'user',
                attributes: ['uid', 'uemail', 'uname']
            }]
        })
            .then((module) => {
                if (module !== null) {
                    util.Jwr(res, (module.length > 0), module, "successful !");
                } else {
                    util.Jwr(res, false, {}, "Invalid user details !");
                }
            }).catch(err => {
            util.Jwr(res, false, {}, "Something bas has happened, try again !");
        })
    }, true);
});

/* Add purchase to table*/
router.all('/buy/add', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        purchase.findOrCreate({where: {puid: data.puid, pmid: data.pmid}, defaults: data})
            .then(([module, created]) => {
                if (created) {
                    util.Jwr(res, true, module, "Newly add a purchase !");
                } else {
                    util.Jwr(res, false, module, "You already purchased !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error purchasing module");
        })
    }, false)
});

/* create. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        modules.findOrCreate({where: {mtitle: data.mtitle}, defaults: data})
            .then(([module, created]) => {
                if (created) {
                    util.Jwr(res, true, module, "Newly created !");
                } else {
                    util.Jwr(res, false, module, "Title already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating module");
        })
    }, false)
});

/* add activities. */
router.all('/activity/add', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        activities.create(data)
            .then((module) => {
                util.Jwr(res, true, module, "Newly created !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating module");
        })
    }, false)
});

/* remove activities. */
router.all('/activity/del', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        activities.destroy({where: {aid: data.aid}})
            .then((activity) => {
                if (activity) {
                    util.Jwr(res, true, activity, "activity deleted");
                } else {
                    util.Jwr(res, false, activity, "activity to delete done !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting activity");
        })
    }, false)
});

/* remove modules. */
router.all('/module/del', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        modules.destroy({where: {mid: data.mid}})
            .then((module) => {
                if (module) {
                    util.Jwr(res, true, module, "module deleted");
                } else {
                    util.Jwr(res, false, module, "module to delete done !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting module");
        })
    }, false)
});
module.exports = router;