import { GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { Context } from '../basic-types/context.js';
import { UUIDType } from '../basic-types/uuid.js';
import { NonNullListOfNonNull } from '../basic-types/non-null.js';
import { User } from '../basic-types/user.js';
import { parseResolveInfo, ResolveTree, simplify } from 'graphql-parse-resolve-info';
import { User as PrismaUser } from '@prisma/client';

export const usersQuery = {
  type: NonNullListOfNonNull(User),
  resolve: async (_, _args, context: Context, info: GraphQLResolveInfo) => {
    const parsedResolveInfo = parseResolveInfo(info) as ResolveTree;
    const { fields } = simplify(parsedResolveInfo, NonNullListOfNonNull(User));

    const isUserSubscribedToQueried = 'userSubscribedTo' in fields;
    const isSubscribedToUserQueried = 'subscribedToUser' in fields;

    const users = await context.prisma.user.findMany({
      include: {
        userSubscribedTo: isUserSubscribedToQueried,
        subscribedToUser: isSubscribedToUserQueried,
      },
    });

    if (isUserSubscribedToQueried || isSubscribedToUserQueried) {
      const idToUserObject = users.reduce<Record<PrismaUser['id'], PrismaUser>>(
        (acc, user) => {
          acc[user.id] = user;

          return acc;
        },
        {},
      );

      users.forEach((user) => {
        if (isUserSubscribedToQueried) {
          context.dataLoaders.userSubscribedToById.prime(
            user.id,
            user.userSubscribedTo.map((sub) => idToUserObject[sub.authorId]),
          );
        }

        if (isSubscribedToUserQueried) {
          context.dataLoaders.subscribeToUserById.prime(
            user.id,
            user.subscribedToUser.map((sub) => idToUserObject[sub.subscriberId]),
          );
        }
      });
    }

    return users;
  },
};

export const userQuery = {
  type: User,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: Context) =>
    await context.dataLoaders.userById.load(args.id),
};
