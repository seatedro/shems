"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckIcon } from "lucide-react";
import { addLocation } from "@/lib/actions";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
export function AddLocationDialog({ onSubmit }: { onSubmit: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", delayError: 1000 });

  const handler = handleSubmit((data) => {
    console.log(data);
    startTransition(() => addLocation(data as any));
    onSubmit();
    if (formRef.current) {
      formRef.current.reset();
    }
    setDialogOpen(false);
  });
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger className="ml-auto" asChild>
        <Button size="sm" onClick={() => setDialogOpen(true)}>
          Add Service Location
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex">
          <div>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Enter the details of the new location here. Click save when you're
              done.
            </DialogDescription>
          </div>
          <Button type="button" onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogHeader>
        <form onSubmit={handler} id="add-location" ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="LocationType"
                // name="locationtype"
                placeholder="Location Type"
                {...register("locationtype", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="Address"
                // name="address"
                placeholder="Address"
                {...register("address", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="UnitNumber"
                // name="unitnumber"
                placeholder="Unit Number"
                {...register("unitnumber", { required: true })}
              />
            </div>
            <Label htmlFor="Date">Date Acquired:</Label>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="date"
                className="col-span-3"
                id="DateAcquired"
                // name="dateacquired"
                {...register("dateacquired", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="ZipCode"
                placeholder="ZipCode"
                // name="zipcode"
                {...register("zipcode", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="number"
                className="col-span-3"
                id="SquareFootage"
                // name="squarefootage"
                placeholder="Square Footage"
                {...register("squarefootage", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="number"
                className="col-span-3"
                id="NumberOfBedrooms"
                // name="numberofbedrooms"
                placeholder="Number of Bedrooms"
                {...register("numberofbedrooms", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="number"
                className="col-span-3"
                id="NumberOfOccupants"
                // name="numberofoccupants"
                placeholder="Number of Occupants"
                {...register("numberofoccupants", { required: true })}
              />
            </div>
          </div>
          <Button type="submit" form="add-location">
            <CheckIcon /> Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
