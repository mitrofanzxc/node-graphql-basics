import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './member-type.js';
import type { Context } from './context.js';
import { NameType } from '../constants.js';

export const Profile = new GraphQLObjectType({
  name: NameType.PROFILE,
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (profile: { memberTypeId: string }, _args, context: Context) =>
        await context.dataLoaders.memberTypeById.load(profile.memberTypeId),
    },
  },
});
