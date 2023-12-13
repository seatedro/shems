export interface userDataType {
  name: string;
  billingaddress: string;
  username: string;
  password: string;
}

export interface serviceLocationType {
  LocationID: number | null;
  CustomerID: number | null;
  LocationType: string;
  Address: string;
  UnitNumber: string;
  DateAcquired: string;
  SquareFootage: number;
  NumberOfBedrooms: number;
  NumberOfOccupants: number;
  ZipCode: string;
}

export interface DeviceListType {
  deviceid: number;
  locationid: number;
  devicetype: string;
  modelnumber: string;
}

export interface addDeviceType {
  locationID: number | null;
  deviceType: string;
  modelNumber: string;
}

export interface addDeviceModelType {
  name: string;
  models: string[];
}

export interface lineDataType {
  x: string;
  y: number;
}

export interface deviceDataType {
  id: string;
  color: string;
  data: lineDataType[];
}
