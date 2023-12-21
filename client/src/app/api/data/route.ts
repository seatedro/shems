import { DeviceWiseEnergyData } from "@/interfaces/interface";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const customerId = searchParams.get("customerId");
  const deviceId = searchParams.get("deviceId");
  const period = searchParams.get("period");
  console.log("customerId", customerId);
  console.log("deviceId", deviceId);
  console.log("period", period);
  const deviceWiseEnergyReq = await fetch(
    `${process.env.API_URL}/devicedata/device?customerId=${customerId}&deviceId=${deviceId}&period=${period}`
  );
  const res: { deviceWiseEnergyData: DeviceWiseEnergyData[] } =
    await deviceWiseEnergyReq.json();
  return Response.json(res.deviceWiseEnergyData);
}
