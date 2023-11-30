const express = require('express');
const router = express.Router();
const dao = require('../services/dao');

router.get("/" , async (req,res) => {
     let obj= {};
     let result = await dao.getAllList();
     obj.members = result;
     res.render("memberList" , obj);
})

router.get("/regist" , async (req,res) => {
     res.render("registMember");
});

router.post("/regist" , async (req,res) => {
     let obj ={};
     let result = dao.registMember(req.body.name , req.body.email,req.body.password,req.body.money,req.body.position);
     res.redirect("/");
})

module.exports = router;


