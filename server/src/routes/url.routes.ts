import { Router } from "express";
import { createURL, getAllURLs } from "../controllers/url.controller";

const urlRouter = Router();

urlRouter.route("/").post(createURL).get(getAllURLs);

export default urlRouter;
