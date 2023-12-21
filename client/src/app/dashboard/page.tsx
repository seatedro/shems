import { useSession, useUser } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import Analytics from "./analytics";
import { EnergyComparison, EnergyData } from "@/interfaces/interface";
import {
  getDevices,
  getEnergyComparisonData,
  getLocations,
  getMaxPercentIncrease,
  getOverallEnergyData,
} from "@/lib/api";

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

  const devices = await getDevices();

  const comparisonData = await getEnergyComparisonData(user.customerId);

  const maxPercentageIncrease = await getMaxPercentIncrease(user.customerId);

  const overallEnergyConsumption = await getOverallEnergyData(
    user.customerId,
    "all"
  );

  return (
    <>
      <Analytics
        energyData={energyData ? energyData.energyConsumptions : []}
        locations={locations}
        devices={devices}
        comparisonData={comparisonData ? comparisonData : []}
        overallEnergyData={
          overallEnergyConsumption ? overallEnergyConsumption : []
        }
        maxPercentageIncrease={maxPercentageIncrease}
      />
    </>
  );
}
