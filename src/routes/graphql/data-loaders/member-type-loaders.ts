import { MemberType, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const getMemberTypeByIdLoader = (prisma: PrismaClient) =>
  new DataLoader(async (ids: ReadonlyArray<MemberType['id']>) => {
    const memberTypes = await prisma.memberType.findMany({
      where: {
        id: {
          in: [...ids],
        },
      },
    });

    return ids.map((id) => memberTypes.find((type) => id === type.id));
  });
