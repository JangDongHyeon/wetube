import express from "express";
import routes from "../routes";
import {
  videoDetail,
  deleteVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRourer = express.Router();

//upload
videoRourer.get(routes.upload, getUpload);
videoRourer.post(routes.upload, uploadVideo, postUpload);

//video Detail
videoRourer.get(routes.videoDetail(), videoDetail);

//Edit video
videoRourer.get(routes.editVideo(), getEditVideo);
videoRourer.post(routes.editVideo(), postEditVideo);

videoRourer.get(routes.deleteVideo(), deleteVideo);

export default videoRourer;
