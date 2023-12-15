import postgres from "postgres";
import { env } from "./env";

export const sql = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DATABASE,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
});

(async function () {
  const createUsers = await sql`
    CREATE TABLE IF NOT EXISTS auth_user (
        id TEXT PRIMARY KEY,
        username TEXT,
        customer_id INT REFERENCES customers(customerid)
    )
  `;

  const createAuthKey = await sql`CREATE TABLE IF NOT EXISTS user_key (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    hashed_password TEXT
  )`;

  const createUserSession = await sql`CREATE TABLE IF NOT EXISTS user_session (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL
  );`;

  const createCustomers = await sql`CREATE TABLE IF NOT EXISTS Customers (
    CustomerID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    BillingAddress TEXT
  )`;

  const createServiceLocations =
    await sql`CREATE TABLE IF NOT EXISTS ServiceLocations (
    LocationID SERIAL PRIMARY KEY,
    CustomerID INT REFERENCES Customers(CustomerID),
    LocationType VARCHAR(50),
    Address TEXT,
    UnitNumber VARCHAR(50),
    DateAcquired DATE,
    SquareFootage INT,
    NumberOfBedrooms INT,
    NumberOfOccupants INT,
    ZipCode VARCHAR(10)
  )`;

  const createDevices = await sql`CREATE TABLE IF NOT EXISTS Devices (
    DeviceID SERIAL PRIMARY KEY,
    LocationID INT REFERENCES ServiceLocations(LocationID) ON DELETE SET NULL,
    DeviceType VARCHAR(255),
    ModelNumber VARCHAR(255)
  )`;

  const createDeviceData = await sql`CREATE TABLE IF NOT EXISTS DeviceData (
    DataID SERIAL PRIMARY KEY,
    DeviceID INT REFERENCES Devices(DeviceID) ON DELETE NO ACTION,
    Timestamp TIMESTAMP,
    EventType VARCHAR(255),
    Value VARCHAR(255)
  )`;

  const createEnergyPrices = await sql`CREATE TABLE IF NOT EXISTS EnergyPrices (
    PriceID SERIAL PRIMARY KEY,
    ZipCode VARCHAR(10),
    Time TIMESTAMP,
    PricePerKWh DECIMAL
  )`;
})();
