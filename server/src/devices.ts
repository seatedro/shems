import { sql } from "./db";
import { Hono } from "hono";

const app = new Hono();

app.get("/devices/:customerId", async (c) => {
  const customerId = c.req.param("customerId");
  const devices = await sql`
    WITH
    EnergyData AS (
        SELECT
        DeviceID,
        SUM(CAST(Value AS DECIMAL)) AS TotalEnergy
        FROM
        DeviceData
        WHERE
        EventType = 'energy use'
        AND Timestamp >= NOW () - INTERVAL '24 hours'
        GROUP BY
        DeviceID
    )
    SELECT
    d.DeviceID,
    d.DeviceType,
    d.ModelNumber,
    sl.locationid,
    c.customerid,
    COALESCE(EnergyData.TotalEnergy, 0) AS TotalEnergyConsumption
    FROM
    Devices d
    JOIN ServiceLocations sl ON d.LocationID = sl.LocationID
    JOIN Customers c ON sl.CustomerID = c.CustomerID
    JOIN EnergyData ON d.deviceid = EnergyData.deviceId
    WHERE
    c.CustomerID = ${customerId}
  `;

  return c.json(devices);
});
