const config = require("../config");
const mysql = require("mysql2/promise");

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db); // connection을 연결하고
    const [rows] = await connection.query(sql, params); // query를 실행하는 함수
    return rows;
}
module.exports = {
    query,
};