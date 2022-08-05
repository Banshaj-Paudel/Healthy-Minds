import express from "express";
import morgan from "morgan";
import { image_upload } from "./upload";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use(fileUpload());
app.use("/image", image_upload);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
