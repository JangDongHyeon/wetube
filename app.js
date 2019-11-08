import express from "express";
import morgan from "morgan"; //로깅
import helmet from "helmet"; //보안 관련
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routers from "./routes";

import "./passport";

const app = express();

app.set("view engine", "pug");

//미들웨어
app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
console.log("post");
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
  })
);
//초괴회되고,passport가 제 스스로 쿠키를 들여다봐서 그 쿠키 정보에
//해당하는 사용자를 찾아주기 때문
//그리고 passport는 자기가 찾은 그 사용자를 요청(request)의 object,즉 req.user로 만듬
app.use(passport.initialize()); //초기화
app.use(passport.session()); //session 저장

app.use(localsMiddleware);

app.use(routers.home, globalRouter);
app.use(routers.users, userRouter);
app.use(routers.videos, videoRouter);

export default app;
