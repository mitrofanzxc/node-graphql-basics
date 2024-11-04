import { GraphQLNonNull } from 'graphql';
import { Post } from '../basic-types/post.js';
import type { Context } from '../basic-types/context.js';
import { UUIDType } from '../basic-types/uuid.js';
import { NonNullListOfNonNull } from '../basic-types/non-null.js';

export const postsQuery = {
  type: NonNullListOfNonNull(Post),
  resolve: async (_, _args, context: Context) => context.prisma.post.findMany(),
};

export const postQuery = {
  type: Post,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: Context) =>
    await context.dataLoaders.postById.load(args.id),
};
