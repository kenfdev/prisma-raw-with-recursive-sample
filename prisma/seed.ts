import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const nodeA = await prisma.category.create({
    data: {
      name: 'nodeA',
    },
  });

  const nodeB1 = await prisma.category.create({
    data: {
      name: 'nodeB1',
      parentId: nodeA.id,
    },
  });

  const nodeB2 = await prisma.category.create({
    data: {
      name: 'nodeB2',
      parentId: nodeA.id,
    },
  });

  const nodeC11 = await prisma.category.create({
    data: {
      name: 'nodeC11',
      parentId: nodeB1.id,
    },
  });

  const nodeC12 = await prisma.category.create({
    data: {
      name: 'nodeC12',
      parentId: nodeB1.id,
    },
  });

  const nodeC21 = await prisma.category.create({
    data: {
      name: 'nodeC21',
      parentId: nodeB2.id,
    },
  });

  const nodeD111 = await prisma.category.create({
    data: {
      name: 'nodeD111',
      parentId: nodeC11.id,
    },
  });

  const nodeM = await prisma.category.create({
    data: {
      name: 'nodeM',
    },
  });

  const nodeN1 = await prisma.category.create({
    data: {
      name: 'nodeN1',
      parentId: nodeM.id,
    },
  });
  const nodeN2 = await prisma.category.create({
    data: {
      name: 'nodeN2',
      parentId: nodeM.id,
    },
  });
}

main()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
