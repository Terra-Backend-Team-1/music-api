import { z } from "zod";

export const trackBodyValidationSchema = z.object({
	title: z.string().min(2, "Title must contain at least 2 characters"),
	artist: z.string(),
	duration: z.string(),
	genre: z.string(),
	album: z.string(),
	stream_url: z.string(),
});

export type ITrackCreateData = z.infer<typeof trackBodyValidationSchema>;
