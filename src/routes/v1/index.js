import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "./boardRoute";

const Router = express.Router();

Router.get("/", (request, response) => {
  response.status(StatusCodes.OK).json({
    message: "APIs V1 are ready use.",
  });
});

Router.use("/boards", boardRoute);

export const APIs_V1 = Router;
