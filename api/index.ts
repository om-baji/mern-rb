import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import userRouter from "./routes/userRouter";

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


app.get("/", (req, res) => {
  res.json({
    message: "Health OK!",
  });
});

app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running!"));
