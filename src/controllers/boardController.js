import { StatusCodes } from "http-status-codes";

const createNew = async (request, response, next) => {
  try {
    response.status(StatusCodes.CREATED).json({
      message: "Api create new board",
    });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
