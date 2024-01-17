import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";

const Router = express.Router();

Router.route("/")
  .get((request, response) => {
    response.status(StatusCodes.OK).json({
      message: "Api get list boards",
    });
  })
  .post(boardValidation.createNew, boardController.createNew);

export const boardRoute = Router;
