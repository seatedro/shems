"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
export default function DeleteLocationDialog({
  children,
  rowId,
  onDelete,
}: {
  children: React.ReactNode;
  rowId: number | null;
  onDelete: (id: number) => void;
}) {
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null);
  // const handleSerLocDelete = (id: number | null) => {
  //   // Make POST call with the Device ID to delete the record
  //   console.log(id);

  //   const { toast } = useToast();
  //   toast({
  //     variant: "default",
  //     title: "Success..!",
  //     description:
  //       "The Respective Service Location was deleted from your account.",
  //   });
  //   // handleApiCall();
  // };
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you really want to Delete this Service Location?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            service location data and all the devices associated with it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setDeleteRowIndex(null);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            className="bg-red-600 dark:bg-red-400"
            onClick={() => {
              // handleSerLocDelete(deleteRowIndex);
              if (rowId) {
                onDelete(rowId);
              }
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
