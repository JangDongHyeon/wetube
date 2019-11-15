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
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRourer = express.Router();

//upload
videoRourer.get(routes.upload, onlyPrivate, getUpload);
videoRourer.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//video Detail
videoRourer.get(routes.videoDetail(), videoDetail);

//Edit video
videoRourer.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRourer.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRourer.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRourer;
