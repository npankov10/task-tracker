import * as z from 'zod';

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(500),
});

export const updateTaskSchema = createTaskSchema
  .extend({
    completed: z.boolean(),
  })
  .partial()
  .refine((val) => Object.keys(val).length > 0, {
    error: 'At least one field is required',
  });

export type CreateTaskBody = z.infer<typeof createTaskSchema>;
export type UpdateTaskBody = z.infer<typeof updateTaskSchema>;
