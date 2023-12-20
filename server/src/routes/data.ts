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

app.get(
  "/comparison",
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
      WITH TotalEnergyConsumption AS (
          SELECT 
              sl.LocationID,
              sl.SquareFootage,
              SUM(CAST(dd.Value AS decimal)) AS EnergyUsed
          FROM 
              ServiceLocations sl
          JOIN 
              Devices d ON sl.LocationID = d.LocationID
          JOIN 
              DeviceData dd ON d.DeviceID = dd.DeviceID
          WHERE 
              dd.EventType = 'energy use' AND
              dd.Timestamp >= NOW() - INTERVAL '1 month' AND
              dd.Timestamp <= NOW()
          GROUP BY 
              sl.LocationID, sl.SquareFootage
      ), 
      ComparableEnergyConsumption AS (
          SELECT 
              tec1.LocationID,
              tec1.SquareFootage,
              tec1.EnergyUsed,
              COALESCE(AVG(tec2.EnergyUsed), tec1.EnergyUsed) AS AvgEnergyUsed
          FROM 
              TotalEnergyConsumption tec1
          LEFT JOIN 
              TotalEnergyConsumption tec2 ON tec1.LocationID != tec2.LocationID AND 
              tec2.SquareFootage >= tec1.SquareFootage * 0.95 AND
              tec2.SquareFootage <= tec1.SquareFootage * 1.05
          GROUP BY 
              tec1.LocationID, tec1.SquareFootage, tec1.EnergyUsed
      )
      SELECT 
          cec.LocationID,
          sl.Address,
          CAST(cec.EnergyUsed as float),
          CAST(ROUND((cec.EnergyUsed / NULLIF(cec.AvgEnergyUsed, 0)) * 100, 2) as float) AS Percentage
      FROM 
          ComparableEnergyConsumption cec
          JOIN ServiceLocations sl ON cec.LocationID = sl.LocationID
          JOIN Customers c ON sl.CustomerID = c.CustomerID
          WHERE c.CustomerID = ${customerid}
    `;

    return c.json({
      energyComparisons: energyConsumptions,
    });
  }
);

export default app;
