import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sql } from "../db";
import { auth } from "../lucia";
import { Device } from "../types/schema";

const app = new Hono();

app.get(
  "/location/:locationId",
  zValidator(
    "param",
    z.object({
      locationId: z.string(),
    })
  ),
  async (c) => {
    const authRequest = auth.handleRequest(c);
    const session = await authRequest.validate();
    if (!session) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const { locationId } = c.req.valid("param");
    const customerIdInt = z.coerce.number().parse(locationId);

    // Fetching all service locations for a customer
    const serviceLocations = await sql`
    SELECT *
    FROM servicelocations
    WHERE customerid = ${customerIdInt}
  `;
    console.log(
      `Fetched service locations for: ${locationId}`,
      serviceLocations
    );
    return c.json({
      customerIdInt,
      serviceLocations,
    });
  }
);

app.get(
  "/customer/:customerId",
  zValidator(
    "param",
    z.object({
      customerId: z.string(),
    })
  ),
  async (c) => {
    const authRequest = auth.handleRequest(c);
    const session = await authRequest.validate();
    if (!session) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const { customerId } = c.req.valid("param");
    const customerIdInt = z.coerce.number().parse(customerId);

    const devices = await sql`
      SELECT d.*
      FROM devices d
      NATURAL JOIN servicelocations s
      NATURAL JOIN customers c
      WHERE c.customerid = ${customerIdInt}
    `;

    return c.json({
      customerId: customerIdInt,
      devices,
    });
  }
);

app.post("/", async (c) => {
  const authRequest = auth.handleRequest(c);
  const session = await authRequest.validate();
  if (!session) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const body = await c.req.json();
  const schema = z.object({
    locationid: z.string(),
    devicetype: z.string(),
    modelnumber: z.string(),
  });

  const parsed = schema.parse(body);
  const columns = ["locationid", "devicetype", "modelnumber"];
  const device = await sql`
    INSERT INTO devices
    ${sql(parsed as any, columns)}
  `;

  return c.json(
    {
      message: "Inserted a new device successfully",
    },
    201
  );
});

app.delete(
  "/:deviceId",
  zValidator(
    "param",
    z.object({
      deviceId: z.string(),
    })
  ),
  async (c) => {
    const authRequest = auth.handleRequest(c);
    const session = await authRequest.validate();
    if (!session) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const { deviceId } = c.req.valid("param");
    const deviceIdInt = z.coerce.number().parse(deviceId);

    const device = await sql`
    DELETE FROM devices
    WHERE deviceid = ${deviceIdInt}
  `;

    return c.json({
      deviceId: deviceIdInt,
      device,
    });
  }
);

export default app;
