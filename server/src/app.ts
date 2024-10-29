import express from "express";
import morgan from "morgan";
import urlRouter from "./routes/url.routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/url", urlRouter);

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api routes defined on the route /api/v1/*",
  });
});

app.use(errorMiddleware);

export default app;
