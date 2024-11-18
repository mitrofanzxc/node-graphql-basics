import { PrismaClient } from '@prisma/client';
import { getProfileByIdLoader, getProfileByUserIdLoader } from './profile-loaders.js';
import { getMemberTypeByIdLoader } from './member-type-loaders.js';
import { getPostByIdLoader, getPostsByAuthorIdLoader } from './post-loaders.js';
import {
  getSubscribedToUserByIdLoader,
  getUserSubscribedToByIdLoader,
} from './subscribe-loaders.js';
import { getUserByIdLoader } from './user-loaders.js';

export const getDataLoaders = (prisma: PrismaClient) => ({
  memberTypeById: getMemberTypeByIdLoader(prisma),
  profileById: getProfileByIdLoader(prisma),
  profileByUserId: getProfileByUserIdLoader(prisma),
  postById: getPostByIdLoader(prisma),
  postsByAuthorId: getPostsByAuthorIdLoader(prisma),
  userById: getUserByIdLoader(prisma),
  userSubscribedToById: getUserSubscribedToByIdLoader(prisma),
  subscribeToUserById: getSubscribedToUserByIdLoader(prisma),
});
