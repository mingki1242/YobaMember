const express = require('express');
const router = express.Router();
const dao = require('../services/dao');

router.get("/" , async (req,res) => {
     let obj= {};
     let result = await dao.getAllList();
     obj.result = result;
     res.render("memberList" , obj);
})

module.exports = router;