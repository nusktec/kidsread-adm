/**
 * Created by revelation on 18/05/2020.
 */
// const MYSQL_CONN = {
//     dbName: 'rs_kidsreadx',
//     dbUser: 'root',
//     dbPass: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
// };
//For online purpose
const MYSQL_CONN = {
    dbName: 'kidsxytx_kidsreadx',
    dbUser: 'kidsxytx_kidx',
    dbPass: 'xvqHD7BZ9hQ9',
    host: 'localhost',
    port: 3306,
    pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
};
//SSK
const LC_SSK = "a103650ce9d64de3bc4df68a3df53e418617fc39";
//JWT
const JSW_HASH = {exp: '2w', secrete: 'reedax.io'};

module.exports = {MYSQL_CONN: MYSQL_CONN, SSK: LC_SSK, JSW: JSW_HASH};