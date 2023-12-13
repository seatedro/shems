"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckIcon, TrashIcon, X } from "lucide-react";
import { useSession } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";
import { serviceLocationType } from "@/interfaces/interface";
import {
  addLocationInitValues,
  servLocMock,
} from "@/constants/static_constants";

export default function Locations() {
  const [serviceLocations, setServiceLocations] = useState<
    serviceLocationType[]
  >([]);

  const [addedLocation, setAddedLocation] = useState<serviceLocationType>(
    addLocationInitValues
  );

  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    checkSessionValidity();
    handleApiCall();
  }, []);

  const checkSessionValidity = async () => {
    // const session = await useSession();
    // if (!session.isTokenValid) {
    //   redirect("/login");
    // }
  };

  const handleApiCall = () => {
    // Make GET call for the service locations with customerID in the payload
    // Store Response in state
    setServiceLocations(servLocMock);
  };

  const checkValidation = () => {
    if (
      addedLocation.LocationType === addLocationInitValues.LocationType ||
      addedLocation.Address === addLocationInitValues.Address ||
      addedLocation.UnitNumber === addLocationInitValues.UnitNumber ||
      addedLocation.DateAcquired === addLocationInitValues.DateAcquired ||
      addedLocation.ZipCode === addLocationInitValues.ZipCode ||
      addedLocation.SquareFootage === addLocationInitValues.SquareFootage ||
      addedLocation.NumberOfBedrooms ===
        addLocationInitValues.NumberOfBedrooms ||
      addedLocation.NumberOfOccupants ===
        addLocationInitValues.NumberOfOccupants
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleAddSave = () => {
    if (checkValidation()) {
      console.log(addedLocation);
      // Make POST call to save service Location

      toast({
        variant: "default",
        title: "Success..!",
        description: "A New Service Location was added to the account.",
      });
      setAddDialog(false);
      handleApiCall();
    } else {
      toast({
        variant: "default",
        title: "Invalid..!",
        description: "Certain Fields are Empty/Invalid.",
      });
    }
  };

  const handleSerLocDelete = (id: number | null) => {
    // Make POST call with the Device ID to delete the record
    console.log(id);

    toast({
      variant: "default",
      title: "Success..!",
      description:
        "The Respective Service Location was deleted from your account.",
    });
    setDeleteDialog(false);
    handleApiCall();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-black">
      <div className="flex items-center">
        <Dialog open={addDialog}>
          <Button
            className="ml-auto"
            size="sm"
            onClick={() => {
              setAddedLocation(addLocationInitValues);
              setAddDialog(true);
            }}
          >
            Add Service Location
          </Button>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>
                Enter the details of the new location here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  className="col-span-3"
                  id="LocationType"
                  placeholder="Location Type"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      LocationType: target.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  className="col-span-3"
                  id="Address"
                  placeholder="Address"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      Address: target.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  className="col-span-3"
                  id="UnitNumber"
                  placeholder="Unit Number"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      UnitNumber: target.target.value,
                    });
                  }}
                />
              </div>
              <Label htmlFor="Date">Date Acquired:</Label>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  type="date"
                  className="col-span-3"
                  id="DateAcquired"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      DateAcquired: target.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  className="col-span-3"
                  id="ZipCode"
                  placeholder="ZipCode"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      ZipCode: target.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  type="number"
                  className="col-span-3"
                  id="SquareFootage"
                  placeholder="Square Footage"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      SquareFootage: Number(target.target.value),
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  type="number"
                  className="col-span-3"
                  id="NumberOfBedrooms"
                  placeholder="Number of Bedrooms"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      NumberOfBedrooms: Number(target.target.value),
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  type="number"
                  className="col-span-3"
                  id="NumberOfOccupants"
                  placeholder="Number of Occupants"
                  onChange={(target) => {
                    setAddedLocation({
                      ...addedLocation,
                      NumberOfOccupants: Number(target.target.value),
                    });
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setAddDialog(false);
                }}
              >
                <X /> CANCEL
              </Button>
              <Button type="submit" onClick={handleAddSave}>
                <CheckIcon /> SAVE
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center">
        <AlertDialog open={deleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you really want to Delete this Service Location?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                service location data and all the devices in association with
                it..!
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
                  handleSerLocDelete(deleteRowIndex);
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
              <TableHead>Location ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="hidden md:table-cell">
                Location Type
              </TableHead>
              <TableHead>Unit Number</TableHead>
              <TableHead>Square Footage</TableHead>
              <TableHead>Zip Code</TableHead>
              <TableHead>Number of Bedrooms</TableHead>
              <TableHead>Number of Occupants</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceLocations.map((iter) => (
              <TableRow>
                <TableCell>{iter.LocationID}</TableCell>
                <TableCell className="font-medium">{iter.Address}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {iter.LocationType}
                </TableCell>
                <TableCell>{iter.UnitNumber}</TableCell>
                <TableCell>{iter.SquareFootage}</TableCell>
                <TableCell>{iter.ZipCode}</TableCell>
                <TableCell>{iter.NumberOfBedrooms}</TableCell>
                <TableCell>{iter.NumberOfOccupants}</TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setDeleteRowIndex(iter.LocationID);
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
