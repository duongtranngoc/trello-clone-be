/* eslint-disable no-console */
import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";

const START_SEVER = () => {
  const app = express();

  const hostname = "localhost";
  const port = 2728;

  app.get("/", async (request, response) => {
    console.log(await GET_DB().listCollections().toArray());
    response.end("hello world!");
  });

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
