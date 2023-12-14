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
export function AddLocationDialog({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Dialog>
      <DialogTrigger className="ml-auto" asChild>
        <Button size="sm">Add Service Location</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>
            Enter the details of the new location here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form action={addLocation} onSubmit={() => onSubmit()}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="LocationType"
                name="locationtype"
                placeholder="Location Type"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="Address"
                name="address"
                placeholder="Address"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="UnitNumber"
                name="unitnumber"
                placeholder="Unit Number"
              />
            </div>
            <Label htmlFor="Date">Date Acquired:</Label>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="date"
                className="col-span-3"
                id="DateAcquired"
                name="dateacquired"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                className="col-span-3"
                id="ZipCode"
                placeholder="ZipCode"
                name="zipcode"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="number"
                className="col-span-3"
                id="SquareFootage"
                name="squarefootage"
                placeholder="Square Footage"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="number"
                className="col-span-3"
                id="NumberOfBedrooms"
                name="numberofbedrooms"
                placeholder="Number of Bedrooms"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="number"
                className="col-span-3"
                id="NumberOfOccupants"
                name="numberofoccupants"
                placeholder="Number of Occupants"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">
                <CheckIcon /> Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
