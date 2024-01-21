import { StatusCodes } from "http-status-codes";
import { columnService } from "~/services/columnService";

const createColumn = async (request, response, next) => {
  try {
    const createColumn = await columnService.createColumn(request.body);

    response.status(StatusCodes.CREATED).json(createColumn);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createColumn,
};
