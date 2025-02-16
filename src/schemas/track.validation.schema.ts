import { z } from "zod";

export const trackBodyValidationSchema = z.object({
	title: z.string().min(10, "Title must contain at least 10 characters"),
	artist: z.string(),
	duration: z.string(),
	genre: z.string(),
	album: z.string(),
});

export type ITrackCreateData = z.infer<typeof trackBodyValidationSchema>;
