"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  // Perform login logic here
  const loginReq = Object.fromEntries(formData);
  console.log("Received login request", loginReq);

  // Use fetch to make a post request to the server
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(loginReq),
  });

  console.log(await response.json());
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
  });

  console.log(await response.json());
  console.log(response.headers);
}
