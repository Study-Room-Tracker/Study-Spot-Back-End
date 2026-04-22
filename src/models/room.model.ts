import { z } from "zod";

export const createRoomValidation = z.object({
  body: z
    .object({
      name: z.string("Please enter a valid name for the room."),
      status: z.enum(["FREE", "FULL"], {
        message: "Room Status must be either FREE or FULL",
      }),
    })
    .strict(),
});

export const changeRoomStatusValidation = z.object({
  body: z
    .object({
      status: z.enum(["FREE", "FULL"], {
        message: "Room Status must be either FREE or FULL",
      }),
    })
    .strict(),
});

export type createRoomTypeZ = z.infer<typeof createRoomValidation>["body"];

export type changeRoomStatustypeZ = z.infer<
  typeof changeRoomStatusValidation
>["body"];
