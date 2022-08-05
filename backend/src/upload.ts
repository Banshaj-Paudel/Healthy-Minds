import express from "express";
import { Request } from "express";
import uploadFile from "express-fileupload";
import axios from "axios";

export const image_upload = express.Router();

image_upload.post("/", async (req: Request, res) => {
  if (!req.files) {
    res.statusCode = 400;
    res.json({
      message: "No file uploaded",
    });
    return;
  }
  const image = req.files.image as uploadFile.UploadedFile;
  if (!image) {
    res.statusCode = 400;
    res.json({
      message: "Body must contain image filed",
    });
    return;
  }
  const encoded_data = Buffer.from(image.data).toString("base64");
  try {
    const response = await sendImage(encoded_data);
    res.json(response);
    return;
  } catch (error) {
    console.log(error);
    res.send(400); // for now 400
    return;
  }
});

async function sendImage(base64String: string) {
  try {
    console.log(process.env.API_URL);
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
  } catch (error) {
    console.log(error);
  }
}
