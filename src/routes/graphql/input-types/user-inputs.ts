import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { NameType } from '../constants.js';

export const CreateUserInput = new GraphQLInputObjectType({
  name: NameType.CREATE_USER_INPUT,
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: NameType.CHANGE_USER_INPUT,
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});
