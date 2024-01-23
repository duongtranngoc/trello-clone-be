import express from "express";
import { columnController } from "~/controllers/columnController";
import { columnValidation } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/").post(
  columnValidation.createColumn,
  columnController.createColumn
);

Router.route("/:id")
  .put(columnValidation.updateColumn, columnController.updateColumn)
  .delete(columnValidation.deleteColumn, columnController.deleteColumn);

export const columnRoute = Router;
