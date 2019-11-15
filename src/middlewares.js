import multer from "multer";
// import multerS3 from "multer-s3"; AWS S3 관련
// import aws from "aws-sdk";
import routes from "./routes";

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_PRIVATE_KEY
//   region:"ap-northeast-1" //지역 설정
// });

const multerVideo = multer({ dest: "/uploads/videos/" });
const multerAvatar = multer({ dest: "/uploads/avatars/" });

// const multerVideo = multer({
//   storage: multerS3({
//     s3,
//     acl: "public-read",
//     bucket: "babyazalea-wetube/video"
//   })
// });

// const multerAvatar = multer({
//   storage: multerS3({
//     s3,
//     acl: "public-read",
//     bucket: "babyazalea-wetube/avatars"
//   })
// });

// local 변수를 global 변수로 사용하도록 만들어주는 middleWare
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // passport가 user가 담긴 object를 req에도 올려주므로 바로 사용이 가능하다
  res.locals.loggedUser = req.user || null;
  // request(요청)과 response(응답) 사이(middle)에 있으므로
  next();
};
// 공개된 routes의 미들웨어
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
// 비공개 routes의 미들웨어
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
