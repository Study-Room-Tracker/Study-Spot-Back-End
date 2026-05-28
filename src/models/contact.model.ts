import { z } from "zod";

export const createMessageValidation = z.object({
  body: z
    .object({
      name: z.string("Please enter your name").min(1),
      email: z.string("Please enter a valid email").email(),
      message: z.string("Please enter your message").min(1),
    })
    .strict(),
});

export type createMessageTypeZ = z.infer<
  typeof createMessageValidation
>["body"];
