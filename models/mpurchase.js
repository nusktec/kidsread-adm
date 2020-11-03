/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Mpurchase extends eng.Model {}
let mmodules = require('./modules');
let muser = require('./musers');
Mpurchase.init({
    pid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    puid: {type: eng.DataTypes.INTEGER, allowNull: false},
    pmid: {type: eng.DataTypes.INTEGER, allowNull: false},
    pstatus: {type: eng.DataTypes.INTEGER, allowNull: false, defaultValue: 1},
}, {sequelize: conn, modelName: 'rs_purchases'});
Mpurchase.belongsTo(mmodules, {as: 'module', foreignKey: 'pmid'});
Mpurchase.belongsTo(muser, {as: 'user', foreignKey: 'puid'});
conn.sync();
module.exports = Mpurchase;