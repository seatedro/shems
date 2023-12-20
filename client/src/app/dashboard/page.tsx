import { useSession, useUser } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import Analytics from "./analytics";
import { EnergyComparison, EnergyData } from "@/interfaces/interface";
import { getLocations } from "@/lib/api";

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
  const energyData: { energyConsumptions: EnergyData[] } = await req.json();

  const locations = await getLocations();

  const comparisonReq = await fetch(
    `${process.env.API_URL}/devicedata/comparison?customerId=${user?.customerId}`,
    {
      next: {
        tags: [`getEnergyComparison-${user.customerId}`],
      },
    }
  );
  const comparisonData: { energyComparisons: EnergyComparison[] } =
    await comparisonReq.json();

  return (
    <>
      <Analytics
        energyData={energyData ? energyData.energyConsumptions : []}
        locations={locations}
        comparisonData={comparisonData ? comparisonData.energyComparisons : []}
      />
    </>
  );
}
