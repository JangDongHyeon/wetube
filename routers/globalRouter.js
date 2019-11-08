import express from "express";
import router from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  logout,
  postJoin,
  postLogin,
  getLogin
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(router.join, getJoin);
globalRouter.post(router.join, postJoin, postLogin);

globalRouter.get(router.login, getLogin);
globalRouter.post(router.login, postLogin);

globalRouter.get(router.home, home);
globalRouter.get(router.search, search);
globalRouter.get(router.logout, logout);

export default globalRouter;
