import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((request, response) => {
    response.status(StatusCodes.OK).json({
      message: "Api get list boards",
    });
  })
  .post(boardValidation.createNew);

export const boardRoute = Router;
