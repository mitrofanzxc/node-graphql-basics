import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';

export const MemberTypeIdType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: Object.keys(MemberTypeId).reduce(
    (values, key) => {
      values[key] = { value: MemberTypeId[key as keyof typeof MemberTypeId] };
      return values;
    },
    {} as Record<string, { value: string }>,
  ),
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypeIdType) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  },
});
