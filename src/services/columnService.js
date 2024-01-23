/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/ApiError";

const createColumn = async (data) => {
  try {
    const newColumn = {
      ...data,
    };

    const createdColumn = await columnModel.createColumn(newColumn);
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );

    if (getNewColumn) {
      getNewColumn.cards = [];

      await boardModel.pushColumnOrderIds(getNewColumn);
    }

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

const updateColumn = async (columnId, requestBody) => {
  try {
    const updateData = {
      ...requestBody,
      updatedAt: Date.now(),
    };

    const updatedColumn = await columnModel.updateColumn(columnId, updateData);

    return updatedColumn;
  } catch (error) {
    throw error;
  }
};

const deleteColumn = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId);

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column not found!");
    }

    await columnModel.deleteOneById(columnId);

    await cardModel.deleteManyByColumnId(columnId);

    await boardModel.pullColumnOrderIds(targetColumn);

    return { deleteMessage: "Column and its Cards deleted successfully!" };
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createColumn,
  updateColumn,
  deleteColumn,
};
