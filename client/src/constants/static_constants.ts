export const addLocationInitValues = {
  locationid: null,
  customerid: null,
  locationtype: "",
  address: "",
  unitnumber: "",
  dateacquired: "",
  squarefootage: 0,
  numberofbedrooms: 0,
  numberofoccupants: 0,
  zipcode: "",
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
    locationid: 1,
    customerid: 1,
    locationtype: "Primary Residence",
    address: "123 Maple St, New York, NY",
    unitnumber: "1A",
    dateacquired: "2020-01-01",
    squarefootage: 1000,
    numberofbedrooms: 3,
    numberofoccupants: 4,
    zipcode: "10001",
  },
  {
    locationid: 7,
    customerid: 1,
    locationtype: "Rental Property",
    address: "12 Baker St, London, UK",
    unitnumber: "1B",
    dateacquired: "2021-03-02",
    squarefootage: 750,
    numberofbedrooms: 2,
    numberofoccupants: 2,
    zipcode: "NW1 6XE",
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
