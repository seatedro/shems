export const addLocationInitValues = {
  LocationID: null,
  CustomerID: null,
  LocationType: "",
  Address: "",
  UnitNumber: "",
  DateAcquired: "",
  SquareFootage: 0,
  NumberOfBedrooms: 0,
  NumberOfOccupants: 0,
  ZipCode: "",
};

export const addUserInitValues = {
  name: "",
  billingaddress: "",
  username: "",
  password: "",
};

export const addDeviceInitValues = {
  locationID: null,
  deviceType: "",
  modelNumber: "",
};

export const servLocMock = [
  {
    LocationID: 1,
    CustomerID: 1,
    LocationType: "Primary Residence",
    Address: "123 Maple St, New York, NY",
    UnitNumber: "1A",
    DateAcquired: "2020-01-01",
    SquareFootage: 1000,
    NumberOfBedrooms: 3,
    NumberOfOccupants: 4,
    ZipCode: "10001",
  },
  {
    LocationID: 7,
    CustomerID: 1,
    LocationType: "Rental Property",
    Address: "12 Baker St, London, UK",
    UnitNumber: "1B",
    DateAcquired: "2021-03-02",
    SquareFootage: 750,
    NumberOfBedrooms: 2,
    NumberOfOccupants: 2,
    ZipCode: "NW1 6XE",
  },
];

export const deviceListMock = [
  {
    deviceid: 1,
    locationid: 1,
    devicetype: "refrigerator",
    modelnumber: "GE Cafe 400",
  },
  {
    deviceid: 4,
    locationid: 1,
    devicetype: "light",
    modelnumber: "Philips Hue 123",
  },
  {
    deviceid: 8,
    locationid: 1,
    devicetype: "AC system",
    modelnumber: "Hitachi 500",
  },
];

export const addDeviceMock = [
  {
    name: "refrigerator",
    models: ["GE Cafe 400", "Samsung RF250"],
  },
  {
    name: "AC System",
    models: ["Samsung XYZ", "Hitachi 500"],
  },
  {
    name: "dryer",
    models: ["Whirlpool ABC"],
  },
  {
    name: "light",
    models: ["Philips Hue 123", "Nanoleaf"],
  },
  {
    name: "washer",
    models: ["LG Washer 500"],
  },
];

export const LineDataMock = [
  {
    id: "Philips Hue 123",
    color: "hsl(312, 70%, 50%)",
    data: [
      {
        x: "2022-08-01 00:00:00.000",
        y: 0,
      },
      {
        x: "2022-08-18 13:00:00.000",
        y: 40.0,
      },
      {
        x: "2022-08-31 23:59:59.000",
        y: 0,
      },
    ],
  },
  {
    id: "Nanoleaf",
    color: "hsl(147, 70%, 50%)",
    data: [
      {
        x: "2022-08-01 00:00:00.000",
        y: 0,
      },
      {
        x: "2022-08-18 13:00:00.000",
        y: 70.0,
      },
      {
        x: "2022-08-31 23:59:59.000",
        y: 0,
      },
    ],
  },
];
