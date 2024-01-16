import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoutes } from "./boardRoutes";

const Router = express.Router();

Router.get("/", (request, response) => {
  response.status(StatusCodes.OK).json({
    message: "APIs V1 are ready use.",
  });
});

Router.use("/boards", boardRoutes);

export const APIs_V1 = Router;
