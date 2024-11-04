import { PrismaClient } from "@prisma/client";
import { getProfileByIdLoader, getProfileByUserIdLoader } from "./profileLoaders.js";
import { getMemberTypeByIdLoader } from "./memberTypeLoaders.js";
import { getPostByIdLoader, getPostsByAuthorIdLoader } from "./postLoaders.js";
import { getSubscribedToUserByIdLoader, getUserSubscribedToByIdLoader } from "./subscribeLoaders.js";
import { getUserByIdLoader } from "./userLoaders.js";

export const getDataLoaders = (prisma: PrismaClient) => {
  return {
    memberTypeById: getMemberTypeByIdLoader(prisma),
    profileById: getProfileByIdLoader(prisma),
    profileByUserId: getProfileByUserIdLoader(prisma),
    postById: getPostByIdLoader(prisma),
    postsByAuthorId: getPostsByAuthorIdLoader(prisma),
    userById: getUserByIdLoader(prisma),
    userSubscribedToById: getUserSubscribedToByIdLoader(prisma),
    subscribeToUserById: getSubscribedToUserByIdLoader(prisma),
  };
};
