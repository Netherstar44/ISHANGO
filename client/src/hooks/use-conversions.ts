import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertConversion } from "@shared/routes";

// GET /api/conversions
export function useConversions() {
  return useQuery({
    queryKey: [api.conversions.list.path],
    queryFn: async () => {
      const res = await fetch(api.conversions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch conversions');
      return api.conversions.list.responses[200].parse(await res.json());
    },
  });
}

// POST /api/conversions
export function useCreateConversion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertConversion) => {
      const validated = api.conversions.create.input.parse(data);
      const res = await fetch(api.conversions.create.path, {
        method: api.conversions.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.conversions.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to create conversion record');
      }
      return api.conversions.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.conversions.list.path] }),
  });
}
