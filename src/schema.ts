import z from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.number(), // 0(false) or 1(true)
});

export type Todo = z.infer<typeof TodoSchema>;
