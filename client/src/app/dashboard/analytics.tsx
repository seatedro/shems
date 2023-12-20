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
  ServiceLocation,
  EnergyData,
} from "@/interfaces/interface";
import {
  LineDataMock,
  deviceListMock,
  servLocMock,
} from "@/constants/static_constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  XAxis,
  Tooltip,
  Line,
  YAxis,
} from "recharts";

export default function Analytics({
  energyData,
  minValue,
}: {
  energyData: EnergyData[];
  minValue: number;
}) {
  const [serviceLocations, setServiceLocations] = useState<ServiceLocation[]>(
    []
  );
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
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-gray-900">
      <div className="flex gap-4">
        <Card className="w-full dark:bg-slate-800 h-full">
          <CardHeader>
            <CardTitle>Energy Consumption Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {serviceLocations.map((row) => (
                <div className="flex items-center">
                  <p className="text-sm font-medium leading-none">
                    {row.address}
                  </p>
                  <div className="ml-auto">125%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="w-full bg-slate-800 dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Energy Consumption Increase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="text-5xl font-bold text-red-500">+2350 KwH</div>
              <p className="text-lg text-muted-foreground">
                +180.1% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full bg-slate-800 dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Energy Used (24hrs)</CardTitle>
          </CardHeader>
          <CardContent>
            <ReLineChart
              width={400}
              height={100}
              data={energyData}
              margin={{ top: 25 }}
            >
              {/* <XAxis dataKey="timestamp" /> */}
              <YAxis domain={[minValue - 0.5, "auto"]} hide={true} />
              <Tooltip />
              <Line type="monotone" dataKey="consumption" stroke="red" />
            </ReLineChart>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Graph Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger className="ml-auto w-[400px] bg-slate-900 dark:bg-slate-900">
                <SelectValue placeholder="Select Graph Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 dark:bg-slate-900">
                <SelectItem value="overall">Overall</SelectItem>
                <SelectItem value="deviceWise">Device-Wise</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Device</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger className="ml-auto w-[400px] bg-slate-900 dark:bg-slate-900">
                <SelectValue placeholder="Select Device" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 dark:bg-slate-900">
                <SelectItem value="all">All</SelectItem>
                {devices.map((iter) => (
                  <SelectItem
                    key={`${iter.deviceid}`}
                    value={`${iter.deviceid}`}
                  >
                    {iter.devicetype} {"--"} {iter.modelnumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Time Period</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger className="ml-auto w-[400px] bg-slate-900 dark:bg-slate-900">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 dark:bg-slate-900">
                <SelectItem value="hourly">Last 24 hrs</SelectItem>
                <SelectItem value="daily">Last week</SelectItem>
                <SelectItem value="weekly">Last month</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
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
            {serviceLocations.map((iter) => (
              <SelectItem
                key={`${iter.locationid}`}
                value={`${iter.locationid}`}
              >
                {iter.address}
              </SelectItem>
            ))}
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

      {graphFlag && (
        <ResponsiveLine
          data={LineDataMock}
          margin={{ top: 50, right: 150, bottom: 50, left: 100 }}
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
          // pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          // pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          theme={{
            background: "#1e293b",
            text: {
              fill: "white",
            },
            tooltip: {
              basic: {
                color: "black",
              },
            },
          }}
          enableGridX={false}
          enableGridY={false}
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
      )}
    </main>
  );
}
