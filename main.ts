import { AsciiTree } from 'oo-ascii-tree';
import { PrismaClient } from '@prisma/client';

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  depth: number;
}

interface TreeNode {
  node: AsciiTree;
  isRoot: boolean;
}

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const results = await prisma.$queryRaw<Category[]>`
with recursive categories AS(
  select id, "parentId", name, 0 as depth
  from public."Category"
  where "parentId" is NULL
  union
  select s.id, s."parentId", s.name, c.depth + 1
  from public."Category" s
  inner join categories c on c.id = s."parentId"
)
select id, "parentId", name, depth from categories`;

  const normalized = results.reduce((acc, node) => {
    acc[node.id] = {
      node: new AsciiTree(node.name),
      isRoot: node.parentId === null,
    };
    return acc;
  }, {} as { [key: string]: TreeNode });

  for (const category of results) {
    if (!category.parentId) continue;

    const currentNode = normalized[category.id];
    const parentNode = normalized[category.parentId];

    parentNode.node.add(currentNode.node);
  }

  const rootNodes = Object.values(normalized).filter((n) => n.isRoot);

  for (const rootNode of rootNodes) {
    rootNode.node.printTree();
  }
}

main()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
