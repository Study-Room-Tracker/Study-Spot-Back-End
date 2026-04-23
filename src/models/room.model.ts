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

// Restricted to admin
export const updateRoomValidation = z.object({
  body: z
    .object({
      name: z.string("Please enter a valid name for the room."),
      status: z.enum(["FREE", "FULL"], {
        message: "Room Status must be either FREE or FULL",
      }),
    })
    .partial()
    .strict(),
});

// Can be used by both User and Admin
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
export type updateRoomTypeZ = z.infer<typeof updateRoomValidation>["body"];
export type changeRoomStatustypeZ = z.infer<
  typeof changeRoomStatusValidation
>["body"];
