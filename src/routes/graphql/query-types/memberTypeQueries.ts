import { GraphQLNonNull } from 'graphql';
import { MemberTypeIdType, MemberType } from '../basic-types/memberType.js';
import { Context } from '../basic-types/context.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { NonNullListOfNonNull } from '../basic-types/nonNull.js';

export const memberTypesQuery = {
  type: NonNullListOfNonNull(MemberType),
  resolve: async (_, _args, context: Context) =>
    await context.prisma.memberType.findMany(),
};

export const memberTypeQuery = {
  type: MemberType,
  args: {
    id: { type: new GraphQLNonNull(MemberTypeIdType) },
  },
  resolve: async (_, args: { id: MemberTypeId }, context: Context) =>
    await context.dataLoaders.memberTypeById.load(args.id),
};
