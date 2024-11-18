import { PrismaClient } from '@prisma/client';
import { getDataLoaders } from '../data-loaders/get-data-loaders.js';

export type Context = {
  prisma: PrismaClient;
  dataLoaders: ReturnType<typeof getDataLoaders>;
};
