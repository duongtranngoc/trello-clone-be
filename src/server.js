/* eslint-disable no-console */
import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "./config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "./config/environment";
import { APIs_V1 } from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

const START_SEVER = () => {
  const app = express();
  const hostname = env.APP_HOST;
  const port = env.APP_PORT;

  app.use(express.json());

  app.use("/v1", APIs_V1);

  app.use(errorHandlingMiddleware);

  app.listen(port, hostname, () => {
    console.log(`Backend Nodejs is running at: http://${hostname}:${port}`);
  });

  exitHook(() => {
    CLOSE_DB();
  });
};

(async () => {
  try {
    console.log("Connnecting to MongoDB Cloud Atlas...");
    await CONNECT_DB();
    console.log("Connnected to MongoDB Cloud Atlas!");

    START_SEVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
