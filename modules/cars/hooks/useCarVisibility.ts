"use client";

import { useVisibilityToggle } from "@/lib/hooks/useVisibilityToggle";

interface UseCarVisibilityOptions {
  onSuccess?: () => void;
}

export function useCarVisibility({ onSuccess }: UseCarVisibilityOptions = {}) {
  return useVisibilityToggle({
    table: "dealer_cars",
    onSuccess
  });
}