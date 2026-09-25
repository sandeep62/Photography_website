import cors from "cors";
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import { config } from "./config.js";
import { healthRouter } from "./routes/health.js";

export const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());

app.use("/api/health", healthRouter);

const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found" });
};
app.use(notFound);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);
