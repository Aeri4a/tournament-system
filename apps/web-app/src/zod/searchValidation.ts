import { z } from 'zod';

export const itemsSearchSchema = z.object({
  pageNumber: z.number().int().min(1).catch(1),
  pageSize: z.number().int().min(1).max(100).catch(10),
  // search: z.string().trim().catch(''),
});
