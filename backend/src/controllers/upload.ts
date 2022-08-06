import express, { Request } from "express";
import uploadFile from "express-fileupload";
import axios from "axios";
import fileUpload from "express-fileupload";
import { API_URL } from "../config";

export const imageUploadRouter = express.Router();

imageUploadRouter.post("/", fileUpload(), async (req: Request, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const image = req.files.image as uploadFile.UploadedFile;
  if (!image) {
    return res.status(400).json({
      message: "Body must contain image field",
    });
  }

  const encoded_data = Buffer.from(image.data).toString("base64");
  try {
    const response = await sendImage(encoded_data);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ err: "Internal server error" });
  }
});


async function sendImage(base64String: string) {
  const response = await axios.post(
    `${API_URL}/api/v1/predict`,
    {
      base64str: base64String,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}
