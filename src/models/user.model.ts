import { z } from "zod";

export const updateUserValidation = z.object({
  body: z
    .object({
      email: z.string("Please enter a valid email").email(),
      password: z.string("Please enter a password").min(6),
      firstName: z.string("Please enter your first name").min(1),
      lastName: z.string("Please enter your last name").min(1),
    })
    .partial()
    .strict(), // strict() will make sure that no extra fields are allowed in the body
});

export type updateUserTypeZ = z.infer<typeof updateUserValidation>["body"];
