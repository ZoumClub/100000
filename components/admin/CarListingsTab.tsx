"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useDealerCars } from "@/lib/hooks/useDealerCars";
import { DealerCarDialog } from "./dialogs/DealerCarDialog";
import { columns } from "./columns/carListingsColumns";
import { useVisibilityToggle } from "@/lib/hooks/useVisibilityToggle";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import type { DealerCar } from "@/lib/modules/cars/types";

export function CarListingsTab() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState<DealerCar | null>(null);
  const { cars, isLoading, error, refresh } = useDealerCars();
  const { toggleVisibility } = useVisibilityToggle({ 
    table: "dealer_cars",
    onSuccess: refresh 
  });

  const handleEdit = (car: DealerCar) => {
    setSelectedCar(car);
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("dealer_cars")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Car listing deleted successfully");
      refresh();
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car listing");
    }
  };

  const handleClose = () => {
    setSelectedCar(null);
    setShowDialog(false);
    refresh();
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load cars. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Car Listings</h2>
        <Button onClick={() => setShowDialog(true)}>Add New Listing</Button>
      </div>

      <DataTable
        columns={columns}
        data={cars || []}
        meta={{
          onEdit: handleEdit,
          onDelete: handleDelete,
          onToggleVisibility: toggleVisibility
        }}
      />

      <DealerCarDialog
        open={showDialog}
        onClose={handleClose}
        car={selectedCar}
      />
    </div>
  );
}