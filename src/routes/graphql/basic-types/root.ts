import { GraphQLObjectType } from 'graphql';
import { memberTypeQuery, memberTypesQuery } from '../query-types/member-type-queries.js';
import { postQuery, postsQuery } from '../query-types/post-queries.js';
import { profileQuery, profilesQuery } from '../query-types/profile-queries.js';
import { userQuery, usersQuery } from '../query-types/user-queries.js';
import {
  changeUserMutation,
  createUserMutation,
  deleteUserMutation,
} from '../mutation-types/user-mutations.js';
import {
  changePostMutation,
  createPostMutation,
  deletePostMutation,
} from '../mutation-types/post-mutations.js';
import {
  changeProfileMutation,
  createProfileMutation,
  deleteProfileMutation,
} from '../mutation-types/profile-mutations.js';
import {
  subscribeToMutation,
  unsubscribeFromMutation,
} from '../mutation-types/subscribe-mutations.js';
import { NameType } from '../constants.js';

export const rootQueryType = new GraphQLObjectType({
  name: NameType.QUERY,
  fields: {
    memberTypes: memberTypesQuery,
    memberType: memberTypeQuery,
    posts: postsQuery,
    post: postQuery,
    profiles: profilesQuery,
    profile: profileQuery,
    users: usersQuery,
    user: userQuery,
  },
});

export const rootMutationType = new GraphQLObjectType({
  name: NameType.MUTATION,
  fields: {
    createUser: createUserMutation,
    changeUser: changeUserMutation,
    deleteUser: deleteUserMutation,
    createPost: createPostMutation,
    changePost: changePostMutation,
    deletePost: deletePostMutation,
    createProfile: createProfileMutation,
    changeProfile: changeProfileMutation,
    deleteProfile: deleteProfileMutation,
    subscribeTo: subscribeToMutation,
    unsubscribeFrom: unsubscribeFromMutation,
  },
});
