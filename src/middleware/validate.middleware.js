const {NextResponse} = require('next/server');

exports.validate = (schema) => {
    return async (req) => {
		try{
			const body = await req.json();
			const validatedData = schema.parse(body);
			return {
				success: true,
				data: validatedData,
			};
		}catch (error) {
			return {
				success: false,
				response: NextResponse.json(
					{
						success: false,
						message: 'Validation error',
						errors: error.errors?.map((err) => ({
							field: err.path[0],
							message: err.message,
						})),
					},
					{status: 400}
				),
			};
		}
	};
};