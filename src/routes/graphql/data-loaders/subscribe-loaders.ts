import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const getUserSubscribedToByIdLoader = (prisma: PrismaClient) =>
  new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const usersWithAuthors = await prisma.user.findMany({
      where: {
        id: {
          in: [...ids],
        },
      },
      include: {
        userSubscribedTo: {
          select: {
            author: true,
          },
        },
      },
    });

    const userIdToAuthorsObject = usersWithAuthors.reduce<Record<User['id'], User[]>>(
      (acc, user) => {
        acc[user.id] = user.userSubscribedTo.map((subscription) => subscription.author);

        return acc;
      },
      {},
    );

    return ids.map((id) => userIdToAuthorsObject[id] || []);
  });

export const getSubscribedToUserByIdLoader = (prisma: PrismaClient) =>
  new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const usersWithSubs = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
      include: { subscribedToUser: { select: { subscriber: true } } },
    });

    const userIdToSubscribersObject = usersWithSubs.reduce<Record<User['id'], User[]>>(
      (acc, user) => {
        acc[user.id] = user.subscribedToUser.map(
          (subscription) => subscription.subscriber,
        );

        return acc;
      },
      {},
    );

    return ids.map((id) => userIdToSubscribersObject[id] || []);
  });
