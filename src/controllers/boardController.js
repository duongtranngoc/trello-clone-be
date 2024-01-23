import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createBoard = async (request, response, next) => {
  try {
    const createBoard = await boardService.createBoard(request.body);

    response.status(StatusCodes.CREATED).json(createBoard);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (request, response, next) => {
  try {
    const boardId = request.params.id;
    const board = await boardService.getDetails(boardId);

    response.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const updateBoard = async (request, response, next) => {
  try {
    const boardId = request.params.id;
    const updatedBoard = await boardService.updateBoard(boardId, request.body);

    response.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

const moveCardToDifferentColumn = async (request, response, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(request.body);

    response.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createBoard,
  getDetails,
  updateBoard,
  moveCardToDifferentColumn,
};
