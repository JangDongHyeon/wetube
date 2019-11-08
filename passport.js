import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

//쿠키에 있는 정보는 자동으로 백엔드 쪽으로 전송
passport.serializeUser(User.serializeUser()); //passport야 쿠키에 오직 user.id만 담아서 보내도록해라
passport.deserializeUser(User.deserializeUser()); //user id 지우기
