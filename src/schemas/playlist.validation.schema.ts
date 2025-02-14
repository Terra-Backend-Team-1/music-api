import { z } from "zod";
import { songValidationSchema } from "./song.validation.schema";

export const playlistValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  coverImage: z.string(),
  song: z.array(songValidationSchema),
  isPublic: z.boolean(),
});

export type IPlaylistData = z.infer<typeof playlistValidationSchema>;

