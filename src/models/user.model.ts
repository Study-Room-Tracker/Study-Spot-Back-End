import { z } from "zod";

export const updateUserValidation = z.object({
  body: z
    .object({
      email: z.string(),
      password: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    })
    .partial()
    .strict(), // strict() will make sure that no extra fields are allowed in the body
});

export type updateUserTypeZ = z.infer<typeof updateUserValidation>["body"];
