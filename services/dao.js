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
    const result = await db.query(sql , [name , email , password,money,position]);
    return result;

}

async function findById(id)
{
    const sql = "select * from yoba where id = ?";
    const member = await db.query(sql , [id]);
    return member[0];
}

async function deleteById(id)
{
    const sql = "delete from yoba where id = ?";
    const result = await db.query(sql , [id]);
}

async function updateMember(id ,name ,email,password, money,position)
{
    const sql = "update yoba set name=? , email = ? , password = ? , money = ? ,position = ? where id = ?";
    const result = await db.query(sql , [name , email , password , money,position,id]);
    return result;
}

async function readCntPlus(id)
{
    const sql = "update yoba set readcnt = readcnt+1 where id = ?";
    const result = await db.query(sql , [id]);
    return result
}
module.exports = {
    getAllList,
    registMember,
    findById,
    deleteById,
    updateMember,
    readCntPlus,
}