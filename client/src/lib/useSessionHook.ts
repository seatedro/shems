import { cookies } from "next/headers";

// Custom hook to check session token validity
export async function useSession() {
  console.log("Server Side...");
  const cookieData = cookies();
  const token = cookieData.get("auth_session");
  try {
    const res = await fetch("http://localhost:3000/validate-session", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (res.status == 200 && data.isValid) {
      return { isTokenValid: true, sessionToken: token };
    }
  } catch (e) {
    console.error(e);
    return { isTokenValid: false, sessionToken: null };
  }

  return { isTokenValid: false, sessionToken: null };
}
