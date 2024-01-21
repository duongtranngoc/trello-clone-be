/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";
import { columnModel } from "~/models/columnModel";

const createColumn = async (data) => {
  try {
    const newColumn = {
      ...data,
    };

    const createdColumn = await columnModel.createColumn(newColumn);
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );

    if (getNewColumn) {
      getNewColumn.cards = [];

      await boardModel.pushColumnOrderIds(getNewColumn);
    }

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createColumn,
};
