import { useSession, useUser } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import LocationComponent from "./location";
import { getLocations } from "@/lib/api";

export default async function Locations() {
  const session = await useSession();
  if (!session.isTokenValid) {
    redirect("/login");
  }
  const data = await getLocations();
  return (
    <>
      <LocationComponent serviceLocations={data ?? []} />
    </>
  );
}
