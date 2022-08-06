import express from "express";
import morgan from "morgan";
import { authRouter } from "./controllers/auth";
import { docRouter } from "./controllers/doc";
import { imageUploadRouter } from "./controllers/upload";
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// Custom routers
app.use("/image", imageUploadRouter);
app.use("/auth", authRouter);
app.use("/doc", docRouter);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
