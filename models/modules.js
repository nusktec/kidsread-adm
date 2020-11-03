/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//other class
let _activities = require('./activities');
class Mmodules extends eng.Model {}
Mmodules.init({
    mid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    mtitle: {type: eng.DataTypes.STRING, allowNull: false},
    mdescription: {type: eng.DataTypes.STRING, allowNull: false},
    mcost: {type: eng.DataTypes.INTEGER, allowNull: false},
    mbanner: {type: eng.DataTypes.TEXT, allowNull: true},
}, {sequelize: conn, modelName: 'rs_modules'});
//make all the child has it
Mmodules.hasMany(_activities, {foreignKey: 'amid', as: 'activities'});
conn.sync();
module.exports = Mmodules;