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
     let result = await dao.registMember(req.body.name , req.body.email,req.body.password,req.body.money,req.body.position);
     res.redirect("/");
})

router.get("/detail/:id" , async (req,res) => {
     let obj = {}
     let result = await dao.readCntPlus(req.params.id);
     obj.member = await dao.findById(req.params.id);
     res.render("detailMember",obj);
});

router.get("/delete/:id" ,async (req,res) => {
     await dao.deleteById(req.params.id);
     res.redirect("/");
})

router.post("/modify", async (req,res) => {
     await dao.updateMember(req.body.id,req.body.name,req.body.email,req.body.password,req.body.money,req.body.position);
     res.redirect("/");
})


module.exports = router;


