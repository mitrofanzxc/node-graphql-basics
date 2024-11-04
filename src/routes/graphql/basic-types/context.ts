import { PrismaClient } from "@prisma/client";
import { getDataLoaders } from "../data-loaders/getDataLoaders.js";

export interface Context {
  prisma: PrismaClient;
  dataLoaders: ReturnType<typeof getDataLoaders>;
}
