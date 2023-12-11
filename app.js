const express = require("express");
const session = require('express-session');
const app = express();

const member_router = require('./routes/member_router');
const users = require('./routes/users');
//포트번호 세팅
app.set('port' , process.env.Port || 3000);

//views 세팅
app.set("views" , __dirname + "/views");
app.set("view engine", "ejs");

//요청의 본문을 해석해주는 미들웨어 바디파서
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//세션 설정
app.use(session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false
}));

app.use("/" , member_router);
app.use("/user" , users);

//3000번 포트에서 대기
app.listen(app.get('port'), () => {
    console.log(app.get('port'));
})

