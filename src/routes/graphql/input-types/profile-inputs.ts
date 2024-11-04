import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from '../basic-types/uuid.js';
import { MemberTypeIdType } from '../basic-types/member-type.js';
import { NameType } from '../constants.js';

export const CreateProfileInput = new GraphQLInputObjectType({
  name: NameType.CREATE_PROFILE_INPUT,
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdType) },
  },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: NameType.CHANGE_PROFILE_INPUT,
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdType },
  },
});
