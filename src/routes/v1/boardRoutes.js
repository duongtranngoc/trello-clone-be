import express from "express";
import { StatusCodes } from "http-status-codes";

const Router = express.Router();

Router.route("/")
  .get((request, response) => {
    response.status(StatusCodes.OK).json({
      message: "Api get list boards",
    });
  })
  .post((request, response) => {
    response.status(StatusCodes.CREATED).json({
      message: "Api create new board",
    });
  });

export const boardRoutes = Router;
