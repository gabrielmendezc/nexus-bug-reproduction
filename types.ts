import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface Context {
  db: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  userId: number;
}
