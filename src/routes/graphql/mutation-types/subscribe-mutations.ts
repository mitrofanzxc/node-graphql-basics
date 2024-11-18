import { GraphQLNonNull, GraphQLString } from 'graphql';
import type { Context } from '../basic-types/context.js';
import { UUIDType } from '../basic-types/uuid.js';
import { Message } from '../constants.js';

export const subscribeToMutation = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve: async (_, args: { userId: string; authorId: string }, context: Context) => {
    try {
      await context.prisma.subscribersOnAuthors.create({
        data: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      });

      return Message.SUBSCRIBE_SUCCESS;
    } catch {
      return Message.SUBSCRIBE_FAIL;
    }
  },
};

export const unsubscribeFromMutation = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve: async (_, args: { userId: string; authorId: string }, context: Context) => {
    try {
      await context.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        },
      });

      return Message.UNSUBSCRIBE_SUCCESS;
    } catch {
      return Message.UNSUBSCRIBE_FAIL;
    }
  },
};
