"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckIcon, TrashIcon, X } from "lucide-react";
import type { ServiceLocation } from "@/interfaces/interface";
import {
  addLocationInitValues,
  servLocMock,
} from "@/constants/static_constants";
import DeleteLocationDialog from "./deleteLocation";

export default function LocationComponent({
  locations,
}: {
  locations: ServiceLocation;
}) {
  const [serviceLocations, setServiceLocations] = useState<ServiceLocation[]>(
    []
  );

  const [addedLocation, setAddedLocation] = useState<ServiceLocation>(
    addLocationInitValues
  );

  const { toast } = useToast();

  useEffect(() => {
    handleApiCall();
  }, []);

  const handleApiCall = () => {
    // Make GET call for the service locations with customerID in the payload
    // Store Response in state
    setServiceLocations(servLocMock);
  };

  const checkValidation = () => {
    if (
      addedLocation.locationtype === addLocationInitValues.locationtype ||
      addedLocation.address === addLocationInitValues.address ||
      addedLocation.unitnumber === addLocationInitValues.unitnumber ||
      addedLocation.dateacquired === addLocationInitValues.dateacquired ||
      addedLocation.zipcode === addLocationInitValues.zipcode ||
      addedLocation.squarefootage === addLocationInitValues.squarefootage ||
      addedLocation.numberofbedrooms ===
        addLocationInitValues.numberofbedrooms ||
      addedLocation.numberofoccupants ===
        addLocationInitValues.numberofoccupants
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
      handleApiCall();
    } else {
      toast({
        variant: "default",
        title: "Invalid..!",
        description: "Certain Fields are Empty/Invalid.",
      });
    }
  };

  const onDelete = (id: number) => {
    // Make POST call with the Device ID to delete the record
    console.log(id);

    toast({
      variant: "default",
      title: "Success..!",
      description:
        "The Respective Service Location was deleted from your account.",
    });
    // handleApiCall();
    // Remove the deleted row from the state
    const newServiceLocations = serviceLocations.filter(
      (iter) => iter.locationid !== id
    );
    setServiceLocations(newServiceLocations);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-black">
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger className="ml-auto">
            <Button
              size="sm"
              onClick={() => {
                setAddedLocation(addLocationInitValues);
              }}
            >
              Add Service Location
            </Button>
          </DialogTrigger>
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
                      locationtype: target.target.value,
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
                      address: target.target.value,
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
                      unitnumber: target.target.value,
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
                      dateacquired: target.target.value,
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
                      zipcode: target.target.value,
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
                      squarefootage: Number(target.target.value),
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
                      numberofbedrooms: Number(target.target.value),
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
                      numberofoccupants: Number(target.target.value),
                    });
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddSave}>
                <CheckIcon /> Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center"></div>
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
                <TableCell>{iter.locationid}</TableCell>
                <TableCell className="font-medium">{iter.address}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {iter.locationtype}
                </TableCell>
                <TableCell>{iter.unitnumber}</TableCell>
                <TableCell>{iter.squarefootage}</TableCell>
                <TableCell>{iter.zipcode}</TableCell>
                <TableCell>{iter.numberofbedrooms}</TableCell>
                <TableCell>{iter.numberofoccupants}</TableCell>
                <TableCell>
                  <DeleteLocationDialog
                    rowId={iter.locationid}
                    onDelete={onDelete}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </DeleteLocationDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
