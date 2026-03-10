const { z } = require("zod");

exports.authSchema = z.object({

	name: z
		.string()
		.min(1,"Invalid Name")
		.max(50),

	email: z
		.string()
		.email("Invalid email format"),

	password: z
		.string()
		.min(8,"Password must be atleast 8 characters long")
		.max(50),

	contact: z
		.string()
		.regex(/^[6-9]\d{9}$/,"Invalid Indian mobile number"),

	role: z
		.enum(["SUPER_ADMIN", "ADMIN", "FACULTY", "USER"])
		.optional()
});