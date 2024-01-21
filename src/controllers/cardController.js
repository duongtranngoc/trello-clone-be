import { StatusCodes } from "http-status-codes";
import { cardService } from "~/services/cardService";

const createCard = async (request, response, next) => {
  try {
    const createCard = await cardService.createCard(request.body);

    response.status(StatusCodes.CREATED).json(createCard);
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  createCard,
};
