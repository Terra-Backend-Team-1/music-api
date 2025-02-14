import { z } from "zod";


export const songValidationSchema = z.object({
  title: z.string().min(10, "Title must contain at least 10 characters"),
  artist: z.string(),
  duration: z.string(),
  genre: z.string(),
  album: z.string()
})

export type ISongData = z.infer<typeof songValidationSchema>;

