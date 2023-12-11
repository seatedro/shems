import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { auth, githubAuth } from "./lucia";
import { env } from "./env";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cors } from "hono/cors";
import prexit from "prexit";
import { sql } from "./db";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) =>
  c.json({
    message: "Hello World!",
  })
);

app.post("/signup", async (c) => {
  const { username, password } = await c.req.json();
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31
  ) {
    console.error(c.req);
    return c.json({ message: "Invalid username" }, 400);
  }
  if (
    typeof password !== "string" ||
    password.length < 5 ||
    password.length > 255
  ) {
    return c.json({ message: "Invalid password" }, 400);
  }
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username.toLowerCase(),
        password,
      },
      attributes: {
        username,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(c);
    authRequest.setSession(session);
    return c.json(
      {
        message: "Signed up Successfully",
      },
      201
    );
  } catch (e) {
    console.error(e);
    return c.json(
      {
        message: "Username already taken",
      },
      400
    );
  }
});

app.post("/login", async (c) => {
  const { username, password } = await c.req.json();
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31
  ) {
    return c.json({ message: "Invalid username" }, 400);
  }
  if (
    typeof password !== "string" ||
    password.length < 5 ||
    password.length > 255
  ) {
    return c.json({ message: "Invalid password" }, 400);
  }
  try {
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(c);
    authRequest.setSession(session);

    return c.json({ message: "Logged in successfully!" }, 200);
  } catch (e) {
    console.error(e);
    return c.json({ message: "Incorrect username or password" }, 400);
  }
});

app.get("/login/github", async (c) => {
  const [url, state] = await githubAuth.getAuthorizationUrl();
  setCookie(c, "github_oauth_state", state, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 1000,
  });

  return c.redirect(url.toString());
});

app.get("/login/github/callback", async (c) => {
  const storedState = getCookie(c, "github_oauth_state");
  const state = c.req.query().state;
  const code = c.req.query().code;

  if (
    !storedState ||
    !state ||
    storedState !== state ||
    typeof code !== "string"
  ) {
    return c.json({ message: "Invalid state" }, 400);
  }

  try {
    const { getExistingUser, githubUser, createUser } =
      await githubAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          username: githubUser.login,
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(c);
    authRequest.setSession(session);

    return c.redirect("/");
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return c.json({ message: e.message }, 400);
    }
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

app.post("/logout", async (c) => {
  const authRequest = auth.handleRequest(c);
  const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`

  if (!session) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  await auth.invalidateSession(session.sessionId);

  authRequest.setSession(null); // for session cookie

  // redirect back to login page
  return c.json({ message: "Logged out successfully" });
});

app.get("/user", async (context) => {
  console.log("context", context);
  const authRequest = auth.handleRequest(context);
  const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`
  if (session) {
    const user = session.user;
    const username = user.username;
    return context.json({ username });
  }
  return context.json({ message: "Unauthorized" }, 401);
});

app.get("/validate-session", async (c) => {
  const authRequest = auth.handleRequest(c);
  const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`
  if (session) {
    return c.json({ message: "Valid session", isValid: true });
  }
  return c.json({ message: "Invalid session", isValid: false }, 401);
});

prexit(async () => {
  if (env.NODE_ENV === "dev") {
    await sql`DELETE FROM user_session;`;
    await sql`DELETE FROM user_key;`;
    await sql`DELETE FROM auth_user;`;
  }
  await sql.end();
});

export default app;
