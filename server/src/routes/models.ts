import { Hono } from "hono";
import data from "../data/models.json";
import { auth } from "../lucia";

const app = new Hono();

app.get("/", async (c) => {
  const authRequest = auth.handleRequest(c);
  const session = await authRequest.validate();
  if (!session) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  return c.json(data);
});

export default app;
