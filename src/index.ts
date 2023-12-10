import { Hono } from "hono";
import { auth } from "./lucia";

const app = new Hono();

app.get("/", (c) =>
  c.json({
    message: "Hello World!",
  }),
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
      201,
    );
  } catch (e) {
    console.error(e);
    return c.json(
      {
        message: "Username already taken",
      },
      400,
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

export default app;
