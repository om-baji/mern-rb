import cors from "cors";
import express from "express";
import userRouter from "./controller/authController";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import adminController from "./controller/adminController";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    message: "Health OK!",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/admin", adminController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running!"));
