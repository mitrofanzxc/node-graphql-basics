import { GraphQLNonNull, GraphQLString } from 'graphql';
import { ChangePostInput, CreatePostInput } from '../input-types/post-inputs.js';
import { Post } from '../basic-types/post.js';
import type { Context } from '../basic-types/context.js';
import { ChangePostDto, CreatePostDto } from '../basic-types/dto.js';
import { UUIDType } from '../basic-types/uuid.js';
import { Message } from '../constants.js';

export const createPostMutation = {
  type: new GraphQLNonNull(Post),
  args: {
    dto: {
      type: new GraphQLNonNull(CreatePostInput),
    },
  },
  resolve: async (_, args: { dto: CreatePostDto }, context: Context) =>
    await context.prisma.post.create({ data: args.dto }),
};

export const changePostMutation = {
  type: new GraphQLNonNull(Post),
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    dto: {
      type: new GraphQLNonNull(ChangePostInput),
    },
  },
  resolve: async (_, args: { id: string; dto: ChangePostDto }, context: Context) =>
    await context.prisma.post.update({ where: { id: args.id }, data: args.dto }),
};

export const deletePostMutation = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: Context) => {
    try {
      await context.prisma.post.delete({
        where: {
          id: args.id,
        },
      });

      return Message.POST_DELETE_SUCCESS;
    } catch {
      return Message.POST_DELETE_FAIL;
    }
  },
};
