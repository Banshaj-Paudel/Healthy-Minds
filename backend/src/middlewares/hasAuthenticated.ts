import * as jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { JWT_SECRET } from "../config";

export const hasAuthenticated: RequestHandler = async (req, res, next) => {
  const headers = req.headers;
  const jwtToken = headers["authorization"] || "";

  if (jwtToken.length == 0) {
    return res.status(400);
  }

  const token = jwtToken.replace("Bearer ", "");

  try {
    const userPayload = jwt.verify(token, JWT_SECRET) as AccessPayload;
    req.user = userPayload;
    return next();
  } catch {
    return res.status(401);
  }
};
