const express = require("express");
const session = require('express-session');
const app = express();
const member_router = require('./routes/member_router');


//포트번호 세팅
app.set('port' , process.env.Port || 3000);

//views 세팅
app.set("views" , __dirname + "/views");
app.set("view engine" , "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false
}));

app.use("/" , member_router);

//3000번 포트에서 대기
app.listen(app.get('port'), () => {
    console.log(app.get('port'));

})