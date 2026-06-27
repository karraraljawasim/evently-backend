import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import attendeeRouters from "./routes/attendee.routes.js";
import organizerRouters from "./routes/organizer.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import swaggerRouter from "./swagger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", attendeeRouters);
app.use("/api/v1/events", organizerRouters);
app.use("/api-docs", swaggerRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Evently API homepage");
});

app.listen(PORT, () => {
  console.log(`Server run on post ${PORT}`);
});
