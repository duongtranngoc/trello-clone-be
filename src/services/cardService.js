/* eslint-disable no-useless-catch */
import { cardModel } from "~/models/cardModel";

const createCard = async (data) => {
  try {
    const newCard = {
      ...data,
    };

    const createdCard = await cardModel.createCard(newCard);
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);

    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createCard,
};
