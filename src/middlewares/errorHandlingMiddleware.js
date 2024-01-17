import { StatusCodes } from "http-status-codes";

export const errorHandlingMiddleware = (error, request, response) => {
  if (!error.statusCode) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  const responseError = {
    statusCode: error.statusCode,
    message: error.message || StatusCodes[error.statusCode],
    stack: error.stack,
  };

  response.status(responseError.statusCode).json(responseError);
};
