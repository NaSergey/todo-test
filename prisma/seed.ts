import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/server/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const db = new PrismaClient({ adapter });

async function main() {
  const existingUsers = await db.user.count();
  if (existingUsers > 0) {
    console.log("Database already has data, skipping seed");
    return;
  }

  const [alice, bob] = await Promise.all([
    db.user.create({ data: { name: "Alice", email: "alice@example.com" } }),
    db.user.create({ data: { name: "Bob", email: "bob@example.com" } }),
  ]);

  await db.todo.createMany({
    data: [
      {
        title: "Настроить CI",
        priority: "HIGH",
        pinned: true,
        creatorId: alice.id,
        assigneeId: alice.id,
      },
      {
        title: "Написать тесты",
        description: "Покрыть сервисный слой",
        priority: "MEDIUM",
        creatorId: alice.id,
        assigneeId: bob.id,
      },
      {
        title: "Обновить README",
        priority: "LOW",
        completed: true,
        creatorId: bob.id,
        assigneeId: bob.id,
      },
      {
        title: "Ревью PR",
        priority: "MEDIUM",
        creatorId: bob.id,
        assigneeId: alice.id,
      },
      {
        title: "Идея на бэклог",
        priority: "LOW",
        creatorId: alice.id,
      },
    ],
  });

  console.log("Seeded 2 users and 5 todos");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
