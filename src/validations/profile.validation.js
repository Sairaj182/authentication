const { z } = require("zod");

exports.updateProfileSchema = z.object({
	name: z.string()
            .min(1, 'Invalid name')
            .max(50, 'Name can be atmost 100 characters long')
			.optional(),

	bio: z.string().max(300).optional(),

	contact: z
	    .string()
        .trim()
	    .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number")
		.optional()
});