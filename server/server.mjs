//EXPRESS SERVER CODE HERE
import express from "express";
import lighthouseMiddleware from "./middleware/lighthouse.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/lighthouse", lighthouseMiddleware, (req, res, next) => {
  return res.status(200).send(res.locals.metrics);
});

app.use("/test", (req, res, next) => {
  return res.status(200).send('test');
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
