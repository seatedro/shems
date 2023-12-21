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
  EnergyComparison,
  MaxPercentIncrease,
  Device,
  OverallEnergyData,
  DeviceWiseEnergyData,
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
// import {
//   ResponsiveContainer,
//   LineChart as ReLineChart,
//   XAxis,
//   Tooltip,
//   Line,
//   YAxis,
// } from "recharts";
import {
  BadgeDelta,
  Flex,
  Metric,
  Text,
  Card as TremorCard,
  LineChart as TremorLineChart,
} from "@tremor/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOverallEnergyData } from "@/lib/api";
import useSWR from "swr";

export default function Analytics({
  user,
  energyData,
  comparisonData,
  locations,
  devices,
  maxPercentageIncrease,
  overallEnergyData,
  deviceWiseEnergyData,
}: {
  user: { username: string; customerId: number };
  energyData: EnergyData[];
  comparisonData: EnergyComparison[];
  locations: ServiceLocation[];
  devices: Device[];
  maxPercentageIncrease: MaxPercentIncrease;
  overallEnergyData: Record<string, OverallEnergyData[]>;
  deviceWiseEnergyData: Record<string, DeviceWiseEnergyData[]>;
}) {
  const [energyLocation, setEnergyLocation] = useState<number | null>(
    locations[0].locationid
  );
  const [dailyEnergyData, setDailyEnergyData] = useState<EnergyData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  const [timePeriod, setTimePeriod] = useState<string>("hourly");
  const [graphType, setGraphType] = useState<string>("overall");
  const [overallData, setOverallData] = useState<OverallEnergyData[]>(
    overallEnergyData["all"]
  );
  const [deviceData, setDeviceData] = useState<DeviceWiseEnergyData[]>(
    deviceWiseEnergyData["all"]
  );

  energyData = energyData?.map((e) => {
    return {
      ...e,
      consumption: e.sum,
      date: new Date(e.timestamp),
    };
  });

  useEffect(() => {
    setDailyEnergyData(
      energyData.filter((e) => e.locationid === energyLocation!)
    );
  }, [energyLocation]);

  useEffect(() => {
    if (graphType == "overall") {
      setOverallData(overallEnergyData[timePeriod]);
    } else {
      setDeviceData(deviceWiseEnergyData[timePeriod]);
    }
  }, [timePeriod]);

  const getDeltaType = (percentage: number) => {
    if (percentage < 100 && percentage > 50) {
      return "moderateDecrease";
    } else if (percentage < 50) {
      return "decrease";
    } else if (percentage > 100 && percentage < 150) {
      return "moderateIncrease";
    } else if (percentage > 150) {
      return "increase";
    }

    return "unchanged";
  };

  return (
    <main className="dark flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-gray-900">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detail">Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-8">
          <div className="flex gap-4">
            <Card className="w-full dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Energy Consumption Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea
                  className="h-52 rounded-md"
                  style={{ scrollbarColor: "white black" }}
                >
                  <div className="space-y-6">
                    {comparisonData.map((row) => (
                      <Flex>
                        <div>
                          <Text>{row.address}</Text>
                          <Metric>{row.energyused}</Metric>
                        </div>
                        <BadgeDelta deltaType={getDeltaType(row.percentage)}>
                          {row.percentage}%
                        </BadgeDelta>
                      </Flex>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="w-full bg-slate-800 dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Energy Consumption Increase</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center">
                <div className="flex flex-col justify-center items-center gap-3">
                  {maxPercentageIncrease.address}
                  <div className="text-5xl font-bold text-red-500">
                    +{maxPercentageIncrease.increase} KwH
                  </div>
                  <p className="text-lg text-muted-foreground">
                    +{maxPercentageIncrease.maxPercentIncrease}% from last month
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full bg-slate-800 dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Energy Used (24hrs)</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  defaultValue={energyLocation!.toString()}
                  onValueChange={(v) => setEnergyLocation(parseInt(v))}
                >
                  <SelectTrigger className="ml-auto bg-slate-900 dark:bg-slate-900">
                    <SelectValue placeholder="Select Service Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations &&
                      locations.map((iter) => (
                        <SelectItem
                          key={`${iter.locationid}`}
                          value={`${iter.locationid}`}
                        >
                          {iter.address}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <TremorLineChart
                  className="h-40"
                  data={dailyEnergyData}
                  index="timestamp"
                  color="emerald"
                  categories={["consumption"]}
                  showLegend={false}
                  showXAxis={false}
                  showYAxis={false}
                  yAxisWidth={10}
                  showAnimation={true}
                  autoMinValue={true}
                  curveType="monotone"
                />
              </CardContent>
            </Card>
          </div>
          <Card className="w-full dark:bg-slate-950 bg-slate-950 mt-8">
            <CardHeader>
              <CardTitle>Overall Energy Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <TremorLineChart
                className="h-72"
                data={overallData}
                index="start"
                color="emerald"
                categories={["consumption"]}
                showLegend={true}
                showXAxis={true}
                showYAxis={true}
                // yAxisWidth={50}
                showAnimation={true}
                autoMinValue={true}
                curveType="monotone"
              ></TremorLineChart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="detail" className="mt-8">
          <div className="grid grid-cols-3 gap-4">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Graph Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  defaultValue="overall"
                  onValueChange={(v) => setGraphType(v)}
                >
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
                <Select onValueChange={(v) => setSelectedDevice(parseInt(v))}>
                  <SelectTrigger className="ml-auto w-[400px] bg-slate-900 dark:bg-slate-900">
                    <SelectValue placeholder="Select Device" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 dark:bg-slate-900">
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
                <Select
                  onValueChange={async (v) => {
                    setTimePeriod(v);
                  }}
                  defaultValue="hourly"
                >
                  <SelectTrigger className="ml-auto w-[400px] bg-slate-900 dark:bg-slate-900">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 dark:bg-slate-900">
                    <SelectItem value="hourly">Last 24 hrs</SelectItem>
                    <SelectItem value="daily">Last week</SelectItem>
                    <SelectItem value="weekly">Last month</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
          <Card className="dark:bg-slate-950 bg-slate 950 mt-8">
            <CardHeader>
              <CardTitle>Energy Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              {graphType == "overall" ? (
                <OverallGraph data={overallData} />
              ) : (
                <DeviceGraph
                  customerId={user.customerId}
                  deviceId={selectedDevice!}
                  period={timePeriod}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* <ResponsiveLine
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
        /> */}
    </main>
  );
}

//@ts-ignore
const fetcher = ([url, queryParams = ""]) =>
  fetch(`${url}${queryParams}`).then((res) => res.json());

function OverallGraph({ data }: { data: OverallEnergyData[] }) {
  return (
    <TremorLineChart
      className="h-72"
      data={data}
      index="start"
      color="emerald"
      categories={["consumption"]}
      showLegend={true}
      showXAxis={true}
      showYAxis={true}
      // yAxisWidth={50}
      showAnimation={true}
      autoMinValue={true}
      curveType="monotone"
    ></TremorLineChart>
  );
}

function DeviceGraph({
  customerId,
  deviceId,
  period,
}: {
  customerId: number;
  deviceId: number;
  period: string;
}) {
  if (!customerId || !deviceId || !period) return null;
  const { data, error } = useSWR(
    [
      "/api/data",
      `?customerId=${customerId}&deviceId=${deviceId}&period=${period}`,
    ],
    fetcher
  );

  if (error) return <div>failed to load</div>;
  return (
    <TremorLineChart
      className="h-72"
      data={data}
      index="start"
      color="emerald"
      categories={["consumption"]}
      showLegend={true}
      showXAxis={true}
      showYAxis={true}
      // yAxisWidth={50}
      showAnimation={true}
      autoMinValue={true}
      curveType="monotone"
    ></TremorLineChart>
  );
}
