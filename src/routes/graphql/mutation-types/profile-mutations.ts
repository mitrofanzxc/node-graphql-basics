import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Profile } from '../basic-types/profile.js';
import { ChangeProfileInput, CreateProfileInput } from '../input-types/profile-inputs.js';
import type { Context } from '../basic-types/context.js';
import { ChangeProfileDto, CreateProfileDto } from '../basic-types/dto.js';
import { UUIDType } from '../basic-types/uuid.js';

export const createProfileMutation = {
  type: new GraphQLNonNull(Profile),
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) },
  },
  resolve: async (_, args: { dto: CreateProfileDto }, context: Context) =>
    await context.prisma.profile.create({ data: args.dto }),
};

export const changeProfileMutation = {
  type: new GraphQLNonNull(Profile),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInput) },
  },
  resolve: async (_, args: { id: string; dto: ChangeProfileDto }, context: Context) =>
    await context.prisma.profile.update({ where: { id: args.id }, data: args.dto }),
};

export const deleteProfileMutation = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: Context) => {
    try {
      await context.prisma.profile.delete({ where: { id: args.id } });

      return 'Profile deleted successfully';
    } catch {
      return "Could not delete profile, possibly it doesn't exist.";
    }
  },
};
