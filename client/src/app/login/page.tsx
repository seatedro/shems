import { redirect } from "next/navigation";
import Login from "./login";
import { useSession } from "@/lib/useSessionHook";

export default async function Page() {
  const session = await useSession();
  if (session && session.isTokenValid) {
    redirect("/dashboard");
  }

  return (
    <>
      <Login />
    </>
  );
}
