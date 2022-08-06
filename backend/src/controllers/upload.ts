import express, { Request } from "express";
import uploadFile from "express-fileupload";
import axios from "axios";

export const imageUploadRouter = express.Router();

imageUploadRouter.post("/", async (req: Request, res) => {
  if (!req.files) {
    return res
      .json({
        message: "No file uploaded",
      })
      .status(400);
  }

  const image = req.files.image as uploadFile.UploadedFile;
  if (!image) {
    return res
      .json({
        message: "Body must contain image filed",
      })
      .status(400);
  }

  const encoded_data = Buffer.from(image.data).toString("base64");
  try {
    const response = await sendImage(encoded_data);
    return res.json(response);
  } catch (error) {
    return res.json({ err: "Internal server error" }).status(500);
  }
});

async function sendImage(base64String: string) {
  const response = await axios.post(
    `${process.env.API_URL}/api/v1/predict`,
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
