const db = require("./db");

async function getAllList() {
    const sql = "select id , name , email , password , position , money , date_format(regdate , '%Y-%m-%d') regdate, readcnt from yoba order by id";
    const result = await db.query(sql);
    if(!result){
        return [];
    }
    else {
        return result;
    }
}

async function registMember(name ,email,password, money,position)
{
    const sql = "Insert into yoba (name , email , password , money ,position, regdate) values(?,?,?,?,?, sysdate())";
    const result = db.query(sql , [name , email , password,money,position]);
    return result;

}
module.exports = {
    getAllList,
    registMember,
}