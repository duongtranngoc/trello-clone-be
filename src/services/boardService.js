/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";
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

export const boardService = {
  createBoard,
};
