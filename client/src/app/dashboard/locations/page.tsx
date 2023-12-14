import { useSession, useUser } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import LocationComponent from "./location";

export default async function Locations() {
  const session = await useSession();
  console.log(session);
  if (!session.isTokenValid) {
    redirect("/login");
  }
  const user = await useUser();
  let data;
  const req = await fetch(
    `${process.env.API_URL}/locations/${user?.customerId}`,
    {
      next: {
        tags: ["getLocations"],
      },
    }
  );
  data = await req.json();
  return (
    <>
      <LocationComponent serviceLocations={data ? data.serviceLocations : []} />
    </>
  );
}
