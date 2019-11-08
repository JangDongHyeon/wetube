import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});
//자동적으로 password의 hashing과 salting을 관리하는 것
//hashing:하나의 문자열을 원래의 것을 상징하는 더 짧은 길이의 값이나 키로 변환
//Salting:Hash함수의 input에 랜덤한 데이터를 더함으로써 고유한 결과값을 보장

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
