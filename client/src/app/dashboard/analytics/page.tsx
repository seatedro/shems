"use client";
import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  DeviceListType,
  deviceDataType,
  serviceLocationType,
} from "@/interfaces/interface";
import {
  LineDataMock,
  deviceListMock,
  servLocMock,
} from "@/constants/static_constants";

export default function Analytics() {
  const [serviceLocations, setServiceLocations] = useState<
    serviceLocationType[]
  >([]);
  const [devices, setDevices] = useState<DeviceListType[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);

  const [deviceData, setDeviceData] = useState<deviceDataType[]>([]);

  const [graphFlag, setGraphFlag] = useState<boolean>(false);

  useEffect(() => {
    handleSerLocApiCall();
  }, []);

  const handleSerLocApiCall = () => {
    // Make GET call for the service locations with customerID in the payload
    // Store Response in state
    setServiceLocations(servLocMock);
  };

  const handleDeviceListApiCall = (id: number) => {
    // Make GET call for the list of devices with Location ID in the payload
    // Store Response in state
    setDevices(deviceListMock);
  };

  const handleDeviceDataApiCall = (id: number) => {
    // Make GET call for the list of devices with Device ID in the payload
    // Store Response in state
    setDeviceData(LineDataMock);
    setGraphFlag(true);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-black">
      <h1>
        Choose a Particular Service Location and an associated Device to View
        the Analytics for it:
      </h1>
      <div className="flex items-center">
        <Select
          onValueChange={(value) => {
            setSelectedLocation(Number(value));
            handleDeviceListApiCall(Number(value));
          }}
        >
          <SelectTrigger className="ml-auto w-[400px]">
            <SelectValue placeholder="Select Service Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Location</SelectLabel>
              {serviceLocations.map((iter) => (
                <SelectItem
                  key={`${iter.LocationID}`}
                  value={`${iter.LocationID}`}
                >
                  {iter.Address}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          disabled={selectedLocation === null}
          onValueChange={(value) => {
            setSelectedDevice(Number(value));
            handleDeviceDataApiCall(Number(value));
          }}
        >
          <SelectTrigger className="ml-auto w-[400px]">
            <SelectValue placeholder="Select Device" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Devices</SelectLabel>
              {devices.map((iter) => (
                <SelectItem key={`${iter.deviceid}`} value={`${iter.deviceid}`}>
                  {iter.devicetype} {"--"} {iter.modelnumber}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        {/* {graphFlag && ( */}
        <ResponsiveLine
          data={LineDataMock}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
        {/* )} */}
      </div>
    </main>
  );
}
