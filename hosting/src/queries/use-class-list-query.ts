import { useQuery } from "@tanstack/react-query";
import { classSchema } from "@/models/class-schema";
import { api } from "@/services/api";
import { z } from "zod";

export function useListClassQuery() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data } = await api.get('/turmas')
      const classes = z.array(classSchema).parse(data)

      return classes
    }
  });
}
