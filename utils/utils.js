/**
 * Created by revelation on 18/05/2020.
 */
let tmpUtils = require('./tmpUtils');
//json writer
function Jwr(res, status, data, msg) {
    res.jsonp({status: status, data: data, msg: msg});
}

//check if body is empty
function checkBody(res, body, cbk, isTrue) {
    if (isTrue) {
        cbk(body);
        return;
    }
    if (typeof body !== 'undefined' && body !== null && Object.keys(body).length > 0) {
        cbk(body);
    } else {
        Jwr(res, false, {}, "Requested body seems blank");
    }
}

//export modules
module.exports = {Jwr: Jwr, JSONChecker: checkBody, util: tmpUtils};