import { GraphQLNonNull, GraphQLString } from 'graphql';
import { User } from '../basic-types/user.js';
import type { Context } from '../basic-types/context.js';
import { ChangeUserInput, CreateUserInput } from '../input-types/user-inputs.js';
import { ChangeUserDto, CreateUserDto } from '../basic-types/dto.js';
import { UUIDType } from '../basic-types/uuid.js';

export const createUserMutation = {
  type: new GraphQLNonNull(User),
  args: {
    dto: { type: new GraphQLNonNull(CreateUserInput) },
  },
  resolve: async (_, args: { dto: CreateUserDto }, context: Context) =>
    await context.prisma.user.create({ data: args.dto }),
};

export const changeUserMutation = {
  type: new GraphQLNonNull(User),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeUserInput) },
  },
  resolve: async (_, args: { id: string; dto: ChangeUserDto }, context: Context) =>
    await context.prisma.user.update({ where: { id: args.id }, data: args.dto }),
};

export const deleteUserMutation = {
  type: GraphQLString,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: Context) => {
    try {
      await context.prisma.user.delete({ where: { id: args.id } });

      return 'User deleted successfully';
    } catch (error) {
      return "Could not delete user, possibly it doesn't exist";
    }
  },
};
