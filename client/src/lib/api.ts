import { Device, ServiceLocation } from "@/interfaces/interface";
import { getAuthSessionCookie, useSession, useUser } from "./useSessionHook";

export async function getLocations() {
  const authSession = getAuthSessionCookie();
  const user = await useUser();
  const req = await fetch(
    `${process.env.API_URL}/locations/${user?.customerId}`,
    {
      next: {
        tags: ["getLocations"],
      },
      headers: {
        Origin: process.env.API_URL!,
        Host: process.env.API_HOST!,
        Cookie: `auth_session=${authSession?.value}`,
      },
    }
  );
  const data: { customerId: number; serviceLocations: ServiceLocation[] } =
    await req.json();
  return data?.serviceLocations;
}

export async function getDevices() {
  const authSession = getAuthSessionCookie();
  const user = await useUser();
  const req = await fetch(
    `${process.env.API_URL}/devices/customer/${user?.customerId}`,
    {
      next: {
        tags: ["getDevices"],
      },
      headers: {
        Origin: process.env.API_URL!,
        Host: process.env.API_HOST!,
        Cookie: `auth_session=${authSession?.value}`,
      },
    }
  );
  const data: { devices: Device[]; customerId: number } = await req.json();
  return data?.devices;
}

export async function getModels() {
  const authSession = getAuthSessionCookie();
  const req = await fetch(`${process.env.API_URL}/models`, {
    method: "GET",
    next: {
      tags: ["getModels"],
    },
    headers: {
      Origin: process.env.API_URL!,
      Host: process.env.API_HOST!,
      Cookie: `auth_session=${authSession?.value}`,
    },
  });
  const data: Record<string, string[]> = await req.json();
  return new Map(Object.entries(data));
}
