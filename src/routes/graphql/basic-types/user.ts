import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { Post } from './post.js';
import { Profile } from './profile.js';
import { NonNullListOfNonNull } from './non-null.js';
import { Context } from './context.js';

export const User: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: Profile,
      resolve: async (user: { id: string }, _args, context: Context) =>
        context.dataLoaders.profileByUserId.load(user.id),
    },
    posts: {
      type: NonNullListOfNonNull(Post),
      resolve: async (user: { id: string }, _args, context: Context) =>
        context.dataLoaders.postsByAuthorId.load(user.id),
    },
    userSubscribedTo: {
      type: NonNullListOfNonNull(User),
      resolve: async (user: { id: string }, _args, context: Context) =>
        context.dataLoaders.userSubscribedToById.load(user.id),
    },
    subscribedToUser: {
      type: NonNullListOfNonNull(User),
      resolve: async (user: { id: string }, _args, context: Context) =>
        context.dataLoaders.subscribeToUserById.load(user.id),
    },
  }),
});
