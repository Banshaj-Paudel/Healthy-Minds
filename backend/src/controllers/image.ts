import express, { Request } from "express";
import fs from "fs";
import fileUpload from "express-fileupload";
import crypto from "crypto";
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
  let name = `${crypto.randomBytes(20).toString("hex")}.${
    image.mimetype.split("/")[1]
  }`;
  fs.writeFileSync(`uploads/${name}`, image.data);
  return res.json({
    file_name: name,
  });
});

imageUploadRouter.get("/:file_name", async (req, res) => {
  const file_name = req.params.file_name;
  res.sendFile(file_name, { root: "uploads/" });
});
