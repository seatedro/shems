"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Device, ServiceLocation } from "@/interfaces/interface";
import { TrashIcon } from "lucide-react";
import DeleteDeviceDialog from "./deleteDevice";
import { AddDeviceDialog } from "./addDevice";

export default function DevicesComponent({
  serviceLocations,
  devices,
  models,
}: {
  serviceLocations: ServiceLocation[];
  devices: Device[];
  models: Map<string, string[]>;
}) {
  const { toast } = useToast();
  const onDelete = (id: number) => {
    toast({
      variant: "default",
      title: "Success..!",
      description:
        "The Respective Service Location was deleted from your account.",
    });
  };
  const onAddDeviceSubmit = () => {
    toast({
      variant: "default",
      title: "Success",
      description: "The Device was added to your account.",
    });
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-gray-900">
      <div className="flex items-center">
        <AddDeviceDialog
          onSubmit={onAddDeviceSubmit}
          models={models}
          serviceLocations={serviceLocations}
        />
      </div>

      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device ID</TableHead>
              <TableHead>Location ID</TableHead>
              <TableHead className="hidden md:table-cell">
                Device Type
              </TableHead>
              <TableHead>Model Number</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((iter) => (
              <TableRow>
                <TableCell>{iter.deviceid}</TableCell>
                <TableCell className="font-medium">{iter.locationid}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {iter.devicetype}
                </TableCell>
                <TableCell>{iter.modelnumber}</TableCell>
                <TableCell>
                  <DeleteDeviceDialog rowId={iter.deviceid} onDelete={onDelete}>
                    <Button className="rounded-full bg-red-500" variant="ghost">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </DeleteDeviceDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
