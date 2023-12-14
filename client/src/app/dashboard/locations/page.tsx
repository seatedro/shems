import { useSession } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import LocationComponent from "./location";

export default async function Locations() {
  const session = await useSession();
  console.log(session);
  // if (!session.isTokenValid) {
  //   redirect("/login");
  // }
  let data;
  if (session.isTokenValid) {
    const req = await fetch(
      `${process.env.API_URL}/locations/${session.user.customerId}`
    );
    data = await req.json();
  }
  return (
    <>
      <LocationComponent locations={data ? data.serviceLocations : []} />
    </>
  );
}
