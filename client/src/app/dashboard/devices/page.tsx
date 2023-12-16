import { useSession } from "@/lib/useSessionHook";
import DevicesComponent from "./devices";
import { redirect } from "next/navigation";
import { getDevices, getLocations, getModels } from "@/lib/api";

export default async function Devices() {
  const session = await useSession();
  if (!session.isTokenValid) {
    redirect("/login");
  }
  const serviceLocations = await getLocations();
  const devices = await getDevices();
  const models = await getModels();
  return (
    <>
      <DevicesComponent
        serviceLocations={serviceLocations ?? []}
        devices={devices ?? []}
        models={models ?? []}
      />
    </>
  );
}
