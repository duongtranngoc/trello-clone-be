import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const createColumn = async (request, response, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({}),
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  });

  try {
    await correctCondition.validateAsync(response.body, { abortEarly: false });

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).massage)
    );
  }
};

const updateColumn = async (request, response, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict().message({}),
    boardId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),
  });

  try {
    await correctCondition.validateAsync(request.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).massage)
    );
  }
};

const deleteColumn = async (request, response, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  });

  try {
    await correctCondition.validateAsync(request.params);

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).massage)
    );
  }
};

export const columnValidation = {
  createColumn,
  updateColumn,
  deleteColumn,
};
