import { GraphQLNonNull } from 'graphql';
import { Context } from '../basic-types/context.js';
import { UUIDType } from '../basic-types/uuid.js';
import { NonNullListOfNonNull } from '../basic-types/nonNull.js';
import { Profile } from '../basic-types/profile.js';

export const profilesQuery = {
  type: NonNullListOfNonNull(Profile),
  resolve: async (_, _args, context: Context) => context.prisma.profile.findMany(),
};

export const profileQuery = {
  type: Profile,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: Context) =>
    await context.dataLoaders.profileById.load(args.id),
};
