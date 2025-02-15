import { z } from "zod";
import { songValidationSchema } from "./song.validation.schema";

export const playlistValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  coverImage: z.string(),
  isPublic: z.boolean(),
});

export const playlistIdValidationSchema = z.object({
  playlistId: z.string()
})

export type IPlaylistData = z.infer<typeof playlistValidationSchema>;

