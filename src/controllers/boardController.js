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

export const boardController = {
  createBoard,
};
