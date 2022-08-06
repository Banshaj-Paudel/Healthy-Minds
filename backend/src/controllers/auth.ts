import { Router } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface LoginDto {
  username: string;
  password: string;
}

export const authRouter = Router();

authRouter.post("/login", async function (req, res) {
  const { username, password }: LoginDto = req.body;
  const doctor = await prisma.doctor.findUnique({ where: { username } });

  if (!doctor) {
    return res.json({ error: "User not found" }).status(401);
  }
  if (doctor.password !== password) {
    return res.json({ error: "Wrong password" }).status(401);
  }

  const accessToken = jwt.sign({ userId: doctor.id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return res.json({ accessToken });
});
