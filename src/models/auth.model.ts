import { z } from "zod";

export const registerUserValidation = z.object({
  body: z
    .object({
      email: z.string().email(),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      password: z.string().min(6),
    })
    .strict(),
});

export const loginUserValidation = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .strict(),
});

export type RegisterUserTypeZ = z.infer<typeof registerUserValidation>["body"];
export type LoginUserTypeZ = z.infer<typeof loginUserValidation>["body"];
