import { z } from "zod";

export const followUserValidationSchema = z.object({
	id: z.string().nonempty("User ID is required"),
});

export type IFollowUserData = z.infer<typeof followUserValidationSchema>;
