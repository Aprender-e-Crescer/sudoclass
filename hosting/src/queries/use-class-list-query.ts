import { useQuery } from "@tanstack/react-query";
import { classListSchema } from "@/models/class-list-schema";
import { api } from "@/services/api";
import { z } from "zod";

export function useListClassQuery() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data } = await api.get('/turmas')
      const classes = z.array(classListSchema).parse(data)

      return classes
    }
  });
}
