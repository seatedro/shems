"use client";
// import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, TrashIcon, X } from "lucide-react";
import type { ServiceLocation } from "@/interfaces/interface";
import {
  addLocationInitValues,
  servLocMock,
} from "@/constants/static_constants";
import DeleteLocationDialog from "./deleteLocation";
import { AddLocationDialog } from "./addLocation";
import { Button } from "@/components/ui/button";

export default function LocationComponent({
  serviceLocations,
}: {
  serviceLocations: ServiceLocation[];
}) {
  const { toast } = useToast();

  const onAddLocationSubmit = () => {
    toast({
      variant: "default",
      title: "Success",
      description: "The Service Location was added to your account.",
    });
  };

  const onDelete = (id: number) => {
    toast({
      variant: "default",
      title: "Success..!",
      description:
        "The Respective Service Location was deleted from your account.",
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-900">
      <div className="flex items-center">
        <AddLocationDialog onSubmit={onAddLocationSubmit} />
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
              <TableHead>Sq. Feet</TableHead>
              <TableHead>Zip Code</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Occupants</TableHead>
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
                    <Button className="rounded-full bg-red-500" variant="ghost">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
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
