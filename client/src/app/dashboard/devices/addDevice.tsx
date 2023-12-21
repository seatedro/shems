"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceLocation } from "@/interfaces/interface";
import { addDevice } from "@/lib/actions";
import { CheckIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
export function AddDeviceDialog({
  onSubmit,
  serviceLocations,
  models,
}: {
  onSubmit: () => void;
  serviceLocations: ServiceLocation[];
  models: Map<string, string[]>;
}) {
  const [deviceType, setDeviceType] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ mode: "onChange", delayError: 1000 });

  // const formRef = useRef<HTMLFormElement>(null);

  // const handler = handleSubmit((data) => {
  //   console.log(data);
  //   startTransition(() => addDevice(data as any));
  //   onSubmit();
  //   setDialogOpen(false);
  // });
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger className="ml-auto" asChild>
        <Button size="sm" onClick={() => setDialogOpen(true)}>
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
        <form
          action={addDevice}
          // onSubmit={}
          id="add-device"
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Select name="locationid" onValueChange={(e) => setDeviceType(e)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select LocationId" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {serviceLocations.map((location) => (
                      <SelectItem
                        key={`${location.locationid}`}
                        value={`${location.locationid}`}
                      >
                        {location.address}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Select name="type" onValueChange={(e) => setDeviceType(e)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Device Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from(models.keys()).map((deviceType) => (
                      <SelectItem key={deviceType} value={deviceType}>
                        {deviceType}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Select name="modelnumber">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Model Number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {models.has(deviceType) &&
                      models.get(deviceType)!.map((modelNo) => (
                        <SelectItem key={modelNo} value={modelNo}>
                          {modelNo}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <DialogFooter> */}
          {/* <DialogClose asChild> */}
          <Button type="submit" form="add-device">
            <CheckIcon /> Save
          </Button>
          {/* <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </div> */}
          {/* </DialogClose> */}
          {/* </DialogFooter> */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
