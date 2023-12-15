import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { sql } from "../db";

const app = new Hono();

app.get(
  "/hourly",
  zValidator(
    "query",
    z.object({
      customerId: z.string(),
    })
  ),
  async (c) => {
    const { customerId } = c.req.valid("query");
    const customerid = z.coerce.number().parse(customerId);

    // Fetching all energy consumptions for a customer for the past day
    const energyConsumptions = await sql`
      SELECT
          s.locationid, SUM(CAST(dd.value AS float)), dd.timestamp
      FROM
          DeviceData dd
      JOIN devices d ON d.deviceid = dd.deviceid
      JOIN servicelocations s ON s.locationid = d.locationid
      JOIN customers c ON c.customerid = s.customerid
      WHERE
          EventType = 'energy use' AND
          Timestamp >= NOW() - INTERVAL '24 hours' AND 
          c.customerid = ${customerid}
      GROUP BY s.locationid, dd."timestamp"
      ORDER BY dd.timestamp
    `;

    // console.log(
    //   `Fetched energy consumptions for: ${customerId}`,
    //   energyConsumptions
    // );
    return c.json({
      energyConsumptions,
    });
  }
);

export default app;
