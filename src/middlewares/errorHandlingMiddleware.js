import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";

export const errorHandlingMiddleware = (error, request, response) => {
  if (!error.statusCode) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  const responseError = {
    statusCode: error.statusCode,
    message: error.message || StatusCodes[error.statusCode],
    stack: error.stack,
  };

  if (env.BUILD_MODE !== "development") {
    delete responseError.stack;
  }

  response.status(responseError.statusCode).json(responseError);
};
