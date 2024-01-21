import express from "express";
import { columnController } from "~/controllers/columnController";
import { columnValidation } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/").post(
  columnValidation.createColumn,
  columnController.createColumn
);

export const columnRoute = Router;
