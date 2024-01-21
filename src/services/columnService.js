/* eslint-disable no-useless-catch */
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

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createColumn,
};
