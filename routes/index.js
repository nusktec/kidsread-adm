let express = require('express');
let router = express.Router();
let util = require('../utils/utils');
/* GET home page. */
router.get('/', function (req, res, next) {
    util.Jwr(res, false, {}, 'Welcome to Reedax.API');
});

router.get('/api', function (req, res, next) {
    util.Jwr(res, false, {}, 'Welcome to Reedax.API');
});

module.exports = router;
