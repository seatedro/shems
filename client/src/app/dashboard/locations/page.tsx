import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
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
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckIcon, TrashIcon } from "lucide-react";
import { useSession } from "@/lib/useSessionHook";
import { redirect } from "next/navigation";

export default async function Locations() {
  const session = await useSession();
  if (!session.isTokenValid) {
    redirect("/login");
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 dark:bg-black">
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto" size="sm">
              Add Location
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
                  id="location-name"
                  placeholder="Location Name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  className="col-span-3"
                  id="location-type"
                  placeholder="Type"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  className="col-span-3"
                  id="location-address"
                  placeholder="Address"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                <CheckIcon /> Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Location 1</TableCell>
              <TableCell className="hidden md:table-cell">Warehouse</TableCell>
              <TableCell>123 St, City, State, Country</TableCell>
              <TableCell>
                <Button size="icon" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Location 2</TableCell>
              <TableCell className="hidden md:table-cell">Office</TableCell>
              <TableCell>456 St, City, State, Country</TableCell>
              <TableCell>
                <Button size="icon" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
