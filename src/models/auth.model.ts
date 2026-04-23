import { z } from "zod";

export const registerUserValidation = z.object({
  body: z
    .object({
      email: z.string("Please enter a valid email").email(),
      password: z.string("Please enter a valid password").min(6),
      firstName: z.string("Please enter a valid first name").min(1),
      lastName: z.string("Please enter a valid last name").min(1),
    })
    .strict(),
});

export const loginUserValidation = z.object({
  body: z
    .object({
      email: z.string("Please enter a valid email").email(),
      password: z.string("Please enter a valid password").min(6),
    })
    .strict(),
});

export type RegisterUserTypeZ = z.infer<typeof registerUserValidation>["body"];
export type LoginUserTypeZ = z.infer<typeof loginUserValidation>["body"];
