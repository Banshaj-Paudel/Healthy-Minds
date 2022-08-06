import express, { Request } from "express";
import fileUpload from "express-fileupload";
import { getDiagnosticData } from "../utils/mlResponse";

export const imageUploadRouter = express.Router();

imageUploadRouter.post("/", fileUpload(), async (req: Request, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const image = req.files.image as fileUpload.UploadedFile;
  if (!image) {
    return res.status(400).json({
      message: "Body must contain image field",
    });
  }

  const encoded_data = Buffer.from(image.data).toString("base64");
  console.log(encoded_data);
  try {
    const response = await getDiagnosticData(encoded_data);
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});
