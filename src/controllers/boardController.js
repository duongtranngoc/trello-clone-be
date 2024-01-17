import { StatusCodes } from "http-status-codes";

const createNew = async (request, response) => {
  try {
    response.status(StatusCodes.CREATED).json({
      message: "Api create new board",
    });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const boardController = {
  createNew,
};
