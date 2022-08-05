import express, { RequestHandler } from "express";
import { Doctor, PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface AccessPayload {
  userId: number;
}

const hasAuthorized: RequestHandler = async (req, res, next) => {
  const headers = req.headers;
  const jwtToken = headers["authorization"] || "";

  if (jwtToken.length == 0) {
    return res.status(400);
  }

  const token = jwtToken.replace("Bearer ", "");

  try {
    const userPayload = jsonwebtoken.verify(token, JWT_SECRET) as AccessPayload;
    const user = await prisma.doctor.findUnique({
      where: {
        id: userPayload.userId,
      },
    });

    if (!user) {
      throw Error("unauthenticated");
    }

    req.user = user;
    return next();
  } catch {
    return res.status(400);
  }
};

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/profile", hasAuthorized, function (req, res) {
  const { password, ...restUser } = req.user as Doctor;
  return res.json(restUser);
});

app.post("/login", async function (req, res) {
  const { username, password }: { username: string; password: string } =
    req.body;
  const doctor = await prisma.doctor.findUnique({ where: { username } });

  if (!doctor) {
    return res.json({ error: "User not found" }).status(401);
  }

  if (doctor.password !== password) {
    return res.json({ error: "Wrong password" }).status(401);
  }

  const accessToken = jsonwebtoken.sign({ userId: doctor.id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return res.json({ accessToken });
});

app.get("/", (_req, res) => {
  res.json("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
