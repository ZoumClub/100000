"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export type VisibilityTable = 
  | 'brands' 
  | 'services' 
  | 'accessories' 
  | 'news_articles'
  | 'dealer_cars';

interface UseVisibilityToggleOptions {
  table: VisibilityTable;
  onSuccess?: () => void;
}

export function useVisibilityToggle({ table, onSuccess }: UseVisibilityToggleOptions) {
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleVisibility = async (id: string, isVisible: boolean) => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);

      const { error } = await supabase
        .from(table)
        .update({ is_visible: isVisible })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Item ${isVisible ? 'shown' : 'hidden'} successfully`);
      onSuccess?.();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    toggleVisibility
  };
}