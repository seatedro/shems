"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthSessionCookie, useSession, useUser } from "./useSessionHook";

export async function login(formData: FormData) {
  // Perform login logic here
  const loginReq = Object.fromEntries(formData);

  // Use fetch to make a post request to the server
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(loginReq),
  });

  const [name, value] = response.headers.get("set-cookie")!.split("=");
  cookies().set(name, value);
  redirect("/dashboard");
}

export async function register(formData: FormData) {
  // Perform register logic here
  const registerReq = Object.fromEntries(formData);

  // Use fetch to make a post request to the server
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    body: JSON.stringify(registerReq),
    credentials: "include",
    headers: {},
  });

  if (response.status === 201) {
    redirect("/login");
  }
}

export async function completeProfile(formData: FormData) {
  // Complete profile logic here
  const profileReq = Object.fromEntries(formData);

  // Use fetch to make a post request to the server
  const authSessionCookie = getAuthSessionCookie();
  const response = await fetch("http://localhost:3000/complete-profile", {
    method: "PUT",
    body: JSON.stringify(profileReq),
    headers: {
      Origin: "http://localhost:3000",
      Host: "localhost:3000",
      Cookie: `auth_session=${authSessionCookie?.value}`,
    },
    credentials: "include",
  });

  if (response.status === 200) {
    redirect("/dashboard");
  } else {
    console.error("Error completing profile", response.status);
    //TODO: Perform logout stuff here.
    redirect("/");
  }
}

export async function addLocation(formData: FormData) {
  const user = await useUser();
  const req = {
    locationtype: formData.get("locationtype"),
    address: formData.get("address"),
    unitnumber: formData.get("unitnumber"),
    dateacquired: formData.get("dateacquired"),
    zipcode: formData.get("zipcode"),
    squarefootage: formData.get("squarefootage"),
    numberofbedrooms: formData.get("numberofbedrooms"),
    numberofoccupants: formData.get("numberofoccupants"),
    customerid: user.customerId,
  };
  const authSessionCookie = getAuthSessionCookie();
  const response = await fetch(`${process.env.API_URL}/location`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      Origin: process.env.API_URL!,
      Host: "localhost:3000",
      Cookie: `auth_session=${authSessionCookie?.value}`,
    },
  });

  revalidateTag("getLocations");
}

export async function deleteLocation(rowId: number) {
  const authSessionCookie = getAuthSessionCookie();
  const response = await fetch(`${process.env.API_URL}/location/${rowId}`, {
    method: "DELETE",
    headers: {
      Origin: process.env.API_URL!,
      Host: "localhost:3000",
      Cookie: `auth_session=${authSessionCookie?.value}`,
    },
  });

  revalidateTag("getLocations");
}

export async function addDevice(formData: FormData) {
  console.log("addDevice", formData);
  const req = {
    locationid: formData.get("locationid"),
    devicetype: formData.get("type"),
    modelnumber: formData.get("modelnumber"),
  };
  const authSessionCookie = getAuthSessionCookie();
  const response = await fetch(`${process.env.API_URL}/devices`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      Origin: process.env.API_URL!,
      Host: "localhost:3000",
      Cookie: `auth_session=${authSessionCookie?.value}`,
    },
  });

  revalidateTag("getDevices");
}

export async function deleteDevice(deviceId: number) {
  const authSessionCookie = getAuthSessionCookie();
  const response = await fetch(`${process.env.API_URL}/devices/${deviceId}`, {
    method: "DELETE",
    headers: {
      Origin: process.env.API_URL!,
      Host: "localhost:3000",
      Cookie: `auth_session=${authSessionCookie?.value}`,
    },
  });

  revalidateTag("getDevices");
}
