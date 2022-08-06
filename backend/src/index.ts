import express from "express";
import morgan from "morgan";
import { authRouter } from "./controllers/auth";
import { docRouter } from "./controllers/doc";
import { imageUploadRouter } from "./controllers/image";
import { patientRouter } from "./controllers/patient";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(morgan("tiny"));

app.use(cors())

// Custom routers
app.use("/image", imageUploadRouter);
app.use("/auth", authRouter);
app.use("/doc", docRouter);
app.use("/patient", patientRouter);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
