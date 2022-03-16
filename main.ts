import { PrismaClient } from '@prisma/client';

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  depth: number;
}

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const result = await prisma.$queryRaw<Category[]>`
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

  console.log(result.map((v) => v.name));
}

main()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
