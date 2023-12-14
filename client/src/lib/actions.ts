"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  console.log("Received register request", registerReq);

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
  console.log("Received profile request", profileReq);

  // Use fetch to make a post request to the server
  const authSessionCookie = cookies().get("auth_session");
  console.log("Auth session cookie", authSessionCookie);
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
