/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";

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

    return board;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createBoard,
  getDetails,
};
