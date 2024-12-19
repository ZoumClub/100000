"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface UseCarVisibilityOptions {
  onSuccess?: () => void;
}

export function useCarVisibility({ onSuccess }: UseCarVisibilityOptions = {}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleVisibility = async (id: string, isVisible: boolean) => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);

      const { error } = await supabase
        .from('dealer_cars')
        .update({ is_visible: isVisible })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Car listing ${isVisible ? 'shown' : 'hidden'} successfully`);
      onSuccess?.();
    } catch (error) {
      console.error('Error toggling car visibility:', error);
      toast.error('Failed to update car visibility');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    toggleVisibility
  };
}