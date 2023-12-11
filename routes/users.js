var express = require('express');
var router = express.Router();
const dao = require('../services/dao');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let obj = {}
  obj.warning = null;
  res.render("loginpage" , obj);
});

router.post('/login' , async function(req,res,next) {
  let obj = {};
  let email = req.body.email;
  let password = req.body.password;
  let member = await dao.findbyemail(email);
  let members = await dao.getAllList();
  obj.members = members;

  
  obj.warning = null;
  if(member.password === password)
  {
    req.session.regenerate(err => {
      if(err)
      {
        next(err)
      }
      else
      {
        req.session.login = member.name;
        obj.login = req.session.login;
      }
      req.session.save(err => {
        if (err)
          next(err);
        res.render("memberList" , obj);
      })
    })

  }
  else
  {
    obj.warning = "암호가 일치 하지 않습니다"
    res.render("loginpage" , obj)
  }
})

module.exports = router;
