import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((request, response) => {
    response.status(StatusCodes.OK).json({
      message: "Api get list boards",
    });
  })
  .post(boardValidation.createBoard, boardController.createBoard);

Router.route("/:id").get(boardController.getDetails).post();

export const boardRoute = Router;
