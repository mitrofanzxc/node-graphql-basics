import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

export const getProfileByIdLoader = (prisma: PrismaClient) =>
  new DataLoader(async (ids: ReadonlyArray<Profile['id']>) => {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: [...ids] } },
    });

    return ids.map((id) => profiles.find((profile) => id === profile.id));
  });

export const getProfileByUserIdLoader = (prisma: PrismaClient) =>
  new DataLoader(async (userIds: ReadonlyArray<Profile['userId']>) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: [...userIds] } },
    });

    return userIds.map((userId) => profiles.find((profile) => userId === profile.userId));
  });
