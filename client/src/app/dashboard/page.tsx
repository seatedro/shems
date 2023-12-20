import { useSession, useUser } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import Analytics from "./analytics";
import { EnergyData } from "@/interfaces/interface";

export default async function Page() {
  const session = await useSession();
  if (!session || !session.isTokenValid) {
    redirect("/login");
  }
  const user = await useUser();
  const req = await fetch(
    `${process.env.API_URL}/devicedata/hourly?customerId=${user?.customerId}`,
    {
      next: {
        tags: [`getDeviceDataHourly-${user.customerId}`],
      },
    }
  );
  const data: { energyConsumptions: EnergyData[] } = await req.json();
  const energyData = data?.energyConsumptions
    ?.map((e) => {
      return {
        ...e,
        consumption: e.sum,
        date: new Date(e.timestamp),
      };
    })
    .filter((e) => e.locationid === 9);
  const minValue = Math.min(...energyData.map((e) => e.sum));

  return (
    <>
      <Analytics
        energyData={energyData ? energyData : []}
        minValue={minValue}
      />
    </>
  );
}
