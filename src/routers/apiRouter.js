import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  deleteCommentAPI
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, deleteCommentAPI);

export default apiRouter;
