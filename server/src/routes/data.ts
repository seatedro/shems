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

app.get(
  "/percentincrease",
  zValidator("query", z.object({ customerId: z.string() })),
  async (c) => {
    const { customerId } = c.req.valid("query");
    const customerid = z.coerce.number().parse(customerId);

    const maxPercentIncrease = await sql`
      WITH MonthlyConsumption AS (
          SELECT 
              sl.LocationID,
              EXTRACT(MONTH FROM dd.Timestamp) AS Month,
              SUM(CAST(dd.Value AS DECIMAL)) AS EnergyUsed
          FROM 
              ServiceLocations sl
          JOIN 
              Devices d ON sl.LocationID = d.LocationID
          JOIN 
              DeviceData dd ON d.DeviceID = dd.DeviceID
          WHERE 
              dd.EventType = 'energy use' AND
              dd.Timestamp >= NOW() - INTERVAL '2 months' AND
              dd.Timestamp < NOW()
          GROUP BY 
              sl.LocationID, EXTRACT(MONTH FROM dd.Timestamp)
      ),
      ConsumptionChange AS (
          SELECT 
              a.LocationID,
              a.EnergyUsed AS AugustConsumption,
              s.EnergyUsed AS SeptemberConsumption,
              ((s.EnergyUsed - a.EnergyUsed) / a.EnergyUsed) * 100 AS PercentageIncrease,
              ((s.EnergyUsed - a.EnergyUsed)) AS Increase
          FROM 
              MonthlyConsumption a
          JOIN 
              MonthlyConsumption s ON a.LocationID = s.LocationID
          WHERE 
              a.Month = EXTRACT(MONTH FROM NOW() - INTERVAL '2 months') AND s.MONTH = EXTRACT(MONTH FROM NOW())
      )
      SELECT 
          cc.locationid,
          sl.address,
          CAST(ROUND(PercentageIncrease, 2) AS Float) AS PercentIncrease,
          CAST(ROUND(Increase, 2) AS Float) AS Increase
      FROM 
          ConsumptionChange cc
          JOIN ServiceLocations sl ON sl.locationid = cc.locationid
          JOIN Customers c ON c.customerid = sl.customerid
          WHERE c.customerid = ${customerId}
      ORDER BY PercentIncrease DESC
      LIMIT 1
    `;

    if (maxPercentIncrease.length === 0) {
      return c.json({
        locationid: null,
        address: null,
        increase: null,
        maxPercentIncrease: null,
      });
    }
    return c.json({
      maxPercentIncrease: maxPercentIncrease[0].percentincrease,
      increase: maxPercentIncrease[0].increase,
      address: maxPercentIncrease[0].address,
      locationid: maxPercentIncrease[0].locationid,
    });
  }
);

app.get(
  "/overall",
  zValidator("query", z.object({ customerId: z.string(), period: z.string() })),
  async (c) => {
    const { customerId, period } = c.req.valid("query");
    const customerid = z.coerce.number().parse(customerId);

    let start = 0,
      filter = "MONTH",
      startPeriod = "";

    if (period == "hourly") {
      start = 24;
      startPeriod = "hours";
      filter = "HOUR";
    } else if (period == "daily") {
      start = 1;
      startPeriod = "week";
      filter = "DAY";
    } else if (period == "monthly") {
      start = 1;
      startPeriod = "month";
      filter = "WEEK";
    }

    const overallEnergyData = await sql`
        SELECT 
            CAST(ROUND(SUM(CAST(dd.Value AS DECIMAL)), 2) AS FLOAT) AS Consumption,
            -- EXTRACT(${sql(filter)} FROM dd.Timestamp) AS Period,
            DATE_TRUNC(${filter}, dd.Timestamp) AS Start
        FROM 
            DeviceData dd
        JOIN 
            Devices d ON dd.DeviceID = d.DeviceID
        JOIN 
            ServiceLocations sl ON d.LocationID = sl.LocationID
        JOIN 
            Customers c ON sl.CustomerID = c.CustomerID
        WHERE 
            dd.EventType = 'energy use' AND
            ${
              period !== "all"
                ? sql`dd.Timestamp >= NOW() - ${
                    start + " " + startPeriod
                  }::interval AND`
                : sql``
            }
            dd.Timestamp <= NOW() AND
            c.CustomerID = ${customerid}
        GROUP BY Start
        ORDER BY Start
    `;

    console.log(overallEnergyData);
    if (overallEnergyData.length === 0) {
      return c.json({
        overallEnergyData: [],
      });
    }
    return c.json({
      overallEnergyData,
    });
  }
);

export default app;
