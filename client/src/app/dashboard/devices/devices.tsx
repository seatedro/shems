"use client";
import { useEffect, useState } from "react";
import { CheckIcon, TrashIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DeviceListType,
  addDeviceModelType,
  addDeviceType,
  ServiceLocation,
} from "@/interfaces/interface";
import {
  addDeviceInitValues,
  addDeviceMock,
  deviceListMock,
  servLocMock,
} from "@/constants/static_constants";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function DevicesComponent() {
  const { toast } = useToast();

  const [serviceLocations, setServiceLocations] = useState<ServiceLocation[]>(
    []
  );
  const [deviceList, setDeviceList] = useState<DeviceListType[]>([]);

  const [addedDevice, setAddedDevice] =
    useState<addDeviceType>(addDeviceInitValues);
  const [deviceTypesModel, setDeviceTypesModel] = useState<
    addDeviceModelType[]
  >([]);

  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    handleLocationsApiCall();
  }, []);

  const handleLocationsApiCall = () => {
    // Make GET call for the service locations with customerID in the payload
    // Store Response in state
    setServiceLocations(servLocMock);
  };

  const handleDeviceListApiCall = (id: number) => {
    // Make GET call for the list of devices with Location ID in the payload
    // Store Response in state
    setDeviceList(deviceListMock);
  };

  const handleAddDeviceApiCall = () => {
    // Make GET call for the list of devices types and their model numbers
    // Store Response in state
    setDeviceTypesModel(addDeviceMock);
  };

  const checkValidation = () => {
    if (
      addedDevice.locationID === addDeviceInitValues.locationID ||
      addedDevice.deviceType === addDeviceInitValues.deviceType ||
      addedDevice.modelNumber === addDeviceInitValues.modelNumber
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleAddSave = () => {
    if (checkValidation()) {
      console.log(addedDevice);

      // Make POST call to save Device

      toast({
        variant: "default",
        title: "Success..!",
        description: "A New Device was added to the account.",
      });
      handleDeviceListApiCall(Number(selectedLocation));
    } else {
      toast({
        variant: "default",
        title: "Invalid..!",
        description: "Certain Fields are Empty/Invalid.",
      });
    }
  };

  const handleDeviceDelete = (id: number | null) => {
    // Make POST call with the Service Location ID to delete the record
    console.log(id);

    toast({
      variant: "default",
      title: "Success..!",
      description:
        "The Respective Device was deleted from your Service Location.",
    });
    setDeleteDialog(false);
    handleDeviceListApiCall(Number(selectedLocation));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-black">
      <h1>
        Choose a Particular Service Location to View the Devices Registered for
        it:
      </h1>
      <Select
        onValueChange={(value) => {
          setSelectedLocation(Number(value));
          handleDeviceListApiCall(Number(value));
        }}
      >
        <SelectTrigger className="ml-auto w-[400px]">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Location</SelectLabel>
            {serviceLocations.map((iter) => (
              <SelectItem
                key={`${iter.locationid}`}
                value={`${iter.locationid}`}
              >
                {iter.address}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Dialog>
        <DialogTrigger className="ml-auto" asChild>
          <Button
            disabled={selectedLocation === null}
            size="sm"
            onClick={() => {
              setAddedDevice(addDeviceInitValues);
              handleAddDeviceApiCall();
              setAddedDevice({
                ...addedDevice,
                locationID: selectedLocation,
              });
            }}
          >
            Add Device
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Enter the details of the new Device here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Select
                onValueChange={(value) => {
                  setAddedDevice({
                    ...addedDevice,
                    deviceType: value,
                    modelNumber: "",
                  });
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Device Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {deviceTypesModel.map((iter) => (
                      <SelectItem key={`${iter.name}`} value={`${iter.name}`}>
                        {iter.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Select
                disabled={addedDevice.deviceType === ""}
                onValueChange={(value) => {
                  setAddedDevice({
                    ...addedDevice,
                    modelNumber: value,
                  });
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Model Number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {deviceTypesModel.map(
                      (iter) =>
                        iter.name === addedDevice.deviceType &&
                        iter.models.map((item) => (
                          <SelectItem key={`${item}`} value={`${item}`}>
                            {item}
                          </SelectItem>
                        ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddSave}>
              <CheckIcon /> Save
            </Button>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center">
        <AlertDialog open={deleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you really want to Delete this Device?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                device data and all the analytics in association with it..!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setDeleteRowIndex(null);
                  setDeleteDialog(false);
                }}
              >
                CANCEL
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDeviceDelete(deleteRowIndex);
                }}
              >
                DELETE
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
            {deviceList.map((iter) => (
              <TableRow>
                <TableCell>{iter.deviceid}</TableCell>
                <TableCell className="font-medium">{iter.locationid}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {iter.devicetype}
                </TableCell>
                <TableCell>{iter.modelnumber}</TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setDeleteRowIndex(iter.deviceid);
                      setDeleteDialog(true);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
