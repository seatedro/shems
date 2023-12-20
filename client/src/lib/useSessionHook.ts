import { cookies } from "next/headers";

// Custom hook to check session token validity
export async function useSession() {
  const authSessionCookie = getAuthSessionCookie();
  try {
    const res = await fetch(`${process.env.API_URL}/validate-session`, {
      method: "GET",
      credentials: "include",
      headers: {
        Origin: process.env.API_URL!,
        Host: process.env.API_HOST!,
        Cookie: `auth_session=${authSessionCookie?.value}`,
      },
    });
    const data = await res.json();
    if (res.status == 200 && data.isValid) {
      return { isTokenValid: true, sessionToken: authSessionCookie };
    }
  } catch (e) {
    console.error(e);
    return { isTokenValid: false, sessionToken: null };
  }

  return { isTokenValid: false, sessionToken: null };
}

export async function useUser() {
  const session = await useSession();
  const userData = await fetch(`${process.env.API_URL}/user`, {
    method: "GET",
    credentials: "include",
    headers: {
      Origin: process.env.API_URL!,
      Host: "localhost:3000",
      Cookie: `auth_session=${session.sessionToken?.value}`,
    },
  });
  const user: { username: string; customerId: number } = await userData.json();
  return user;
}

export function getAuthSessionCookie() {
  return cookies().get("auth_session");
}
