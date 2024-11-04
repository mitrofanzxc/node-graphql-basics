import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../basic-types/uuid.js';
import { NameType } from '../constants.js';

export const CreatePostInput = new GraphQLInputObjectType({
  name: NameType.CREATE_POST_INPUT,
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
});

export const ChangePostInput = new GraphQLInputObjectType({
  name: NameType.CHANGE_POST_INPUT,
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  },
});
