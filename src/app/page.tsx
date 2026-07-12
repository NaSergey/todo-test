import { listUsers } from "@/server/user/service";
import { MainPage } from "./(main)/main-page";

export default async function Home() {
  const users = await listUsers();

  return <MainPage initialUsers={users} />;
}
