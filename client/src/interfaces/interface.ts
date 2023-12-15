export interface userDataType {
  name: string;
  billingaddress: string;
  username: string;
  password: string;
}
export type ServiceLocation = {
  locationid: number | null;
  customerid: number | null;
  locationtype: string;
  address: string;
  unitnumber: string;
  dateacquired: string;
  squarefootage: number;
  numberofbedrooms: number;
  numberofoccupants: number;
  zipcode: string;
};

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

export type EnergyData = {
  locationid: number;
  sum: number;
  timestamp: string;
};
