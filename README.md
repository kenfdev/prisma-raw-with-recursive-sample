Example of tree structure using Prisma and raw query against PostgreSQL (WITH RECURSIVE)

## Usage

Spin up PostgreSQL

```sh
docker-compose up
```

Execute migration

```sh
npx prisma migrate dev
```

Run

```sh
npm start
```

Result

```sh
nodeA
 ├─┬ nodeB1
 │ ├─┬ nodeC11
 │ │ └── nodeD111
 │ └── nodeC12
 └─┬ nodeB2
   └── nodeC21
nodeM
 ├── nodeN1
 └── nodeN2
```
