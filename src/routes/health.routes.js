import express from "express";
import { checkHealth } from "../controllers/health.controllers";

const healthRouter = express.Router();

healthRouter.route("/").get(checkHealth);

export default healthRouter;
