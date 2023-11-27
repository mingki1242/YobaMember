const db = require("./db");

async function getAllList() {
    const sql = "select * from yoba order by id";
    const result = await db.query(sql);
    if(!result){
        return [];
    }
    else {
        return result;
    }
}

module.exports = {
    getAllList,

}