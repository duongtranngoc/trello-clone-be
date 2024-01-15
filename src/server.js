import express from "express";

const app = express();

const hostname = "localhost";
const port = 2728;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(port, hostname, () => {
  console.log(`Backend Nodejs is running on port: http://${hostname}:${port}`);
});
