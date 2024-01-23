/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
import { cloneDeep } from "lodash";
import { columnModel } from "~/models/columnModel";
import { cardModel } from "~/models/cardModel";

const createBoard = async (data) => {
  try {
    const newBoard = {
      ...data,
      titleSlug: slugify(data.title),
    };

    const createdBoard = await boardModel.createBoard(newBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found!");
    }

    const responseBoard = cloneDeep(board);
    responseBoard.columns.forEach((column) => {
      column.cards = responseBoard.cards.filter(
        // (card) => card.columnId.toString() === column._id.toString()
        (card) => card.columnId.equals(column._id)
      );
    });

    delete responseBoard.cards;

    return responseBoard;
  } catch (error) {
    throw error;
  }
};

const updateBoard = async (boardId, requestBody) => {
  try {
    const updateData = {
      ...requestBody,
      updatedAt: Date.now(),
    };

    const updatedBoard = await boardModel.updateBoard(boardId, updateData);

    return updatedBoard;
  } catch (error) {
    throw error;
  }
};

const moveCardToDifferentColumn = async (requestBody) => {
  try {
    await columnModel.updateColumn(requestBody.prevColumnId, {
      cardOrderIds: requestBody.prevCardOrderIds,
      updatedAt: Date.now(),
    });

    await columnModel.updateColumn(requestBody.nextColumnId, {
      cardOrderIds: requestBody.nextCardOrderIds,
      updatedAt: Date.now(),
    });

    await cardModel.updateCard(requestBody.currentCardId, {
      columnId: requestBody.nextColumnId,
      updatedAt: Date.now(),
    });

    return { updateResult: "Successfully!" };
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createBoard,
  getDetails,
  updateBoard,
  moveCardToDifferentColumn,
};
