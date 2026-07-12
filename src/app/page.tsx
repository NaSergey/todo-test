import { listUsers } from "@/server/user/service";
import { HomeClient } from "./(main)/page";

export default async function Home() {
  const users = await listUsers();

  return <HomeClient initialUsers={users} />;
}
