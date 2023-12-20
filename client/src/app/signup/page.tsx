import { useSession } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import Signup from "./signup";

export default async function Page() {
  const session = await useSession();
  if (session && session.isTokenValid) {
    redirect("/dashboard");
  }

  return (
    <>
      <Signup />
    </>
  );
}
