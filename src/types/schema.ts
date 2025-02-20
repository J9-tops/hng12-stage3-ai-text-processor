import { z } from "zod";

export const schema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type TSchema = z.infer<typeof schema>;
