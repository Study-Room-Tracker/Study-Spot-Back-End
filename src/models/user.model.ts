import { z } from "zod";

export const updateUserValidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export type updateUserTypeZ = z.infer<typeof updateUserValidation>["body"];
