/* eslint-disable no-console */
import exitHook from "async-exit-hook";
import cors from "cors";
import express from "express";

import { corsOptions } from "./config/cors";
import { env } from "./config/environment";
import { CLOSE_DB, CONNECT_DB } from "./config/mongodb";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { APIs_V1 } from "./routes/v1";

const START_SEVER = () => {
  const app = express();
  const hostname = env.APP_HOST;
  const port = env.APP_PORT;

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/v1", APIs_V1);

  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      console.log(`Backend Nodejs is running at: ${process.env.PORT}`);
    });
  } else {
    app.listen(port, hostname, () => {
      console.log(`Backend Nodejs is running at: http://${hostname}:${port}`);
    });
  }

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
