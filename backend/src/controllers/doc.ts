import { Router } from "express";
import { hasAuthenticated } from "../middlewares/hasAuthenticated";
import { prisma } from "../prisma";

export const docRouter = Router();

docRouter.get("/profile", hasAuthenticated, async function (req, res) {
  const { userId } = req.user;
  const profile = await getProfile(userId);
  return res.json(profile);
});

const getProfile = async (userId: number) => {
  return prisma.doctor.findUnique({
    where: { id: userId },
    select: {
      username: true,
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
