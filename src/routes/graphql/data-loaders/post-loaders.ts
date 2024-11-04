import { Post, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const getPostByIdLoader = (prisma: PrismaClient) =>
  new DataLoader(async (ids: ReadonlyArray<Post['id']>) => {
    const posts = await prisma.post.findMany({
      where: { id: { in: [...ids] } },
    });

    return ids.map((id) => posts.find((post) => id === post.id));
  });

export const getPostsByAuthorIdLoader = (prisma: PrismaClient) =>
  new DataLoader(async (authorIds: ReadonlyArray<Post['authorId']>) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: [...authorIds],
        },
      },
    });

    const authorIdToPostsObject: Record<Post['authorId'], Post[]> = posts.reduce(
      (accObject, post) => {
        const key = post.authorId;

        accObject[key] = accObject[key] ? [...accObject[key], post] : [post];

        return accObject;
      },
      {} as Record<Post['authorId'], Post[]>,
    );

    return authorIds.map((authorId) => authorIdToPostsObject[authorId] || []);
  });
