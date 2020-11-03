/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
class Mactivity extends eng.Model {}
Mactivity.init({
    aid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    amid: {type: eng.DataTypes.INTEGER, allowNull: false},
    atitle: {type: eng.DataTypes.STRING, allowNull: false},
    adescription: {type: eng.DataTypes.STRING, allowNull: false},
    atype: {type: eng.DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    aurl: {type: eng.DataTypes.TEXT, allowNull: false},
    abanner: {type: eng.DataTypes.TEXT, allowNull: false},
}, {sequelize: conn, modelName: 'rs_activities'});
conn.sync();
module.exports = Mactivity;