import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../basic-types/context.js';
import { UUIDType } from '../basic-types/uuid.js';

export const subscribeToMutation = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { userId: string; authorId: string }, context: Context) => {
    try {
      await context.prisma.subscribersOnAuthors.create({
        data: { subscriberId: args.userId, authorId: args.authorId },
      });

      return 'Subscribed successfully';
    } catch {
      return 'Could not subscribe';
    }
  },
};

export const unsubscribeFromMutation = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { userId: string; authorId: string }, context: Context) => {
    try {
      await context.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: { subscriberId: args.userId, authorId: args.authorId },
        },
      });

      return 'Unsubscribed successfully';
    } catch {
      return 'Could not unsubscribe';
    }
  },
};
