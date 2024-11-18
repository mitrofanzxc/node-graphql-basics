import { GraphQLList, GraphQLNonNull, GraphQLNullableType } from 'graphql';

export const NonNullListOfNonNull = <Type extends GraphQLNullableType>(type: Type) =>
  new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(type)));
