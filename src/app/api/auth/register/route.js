const { register } = require('@/controllers/auth.controller');
const ratelimit = require('@/utils/rateLimiter');

exports.POST = async (request)=>{
	try{
		const ip =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"anonymous";
		const {success} = await ratelimit.limit(ip);

		if(!success){
			return Response.json(
				{
					success: false,
					message: "Too many requests"
				},
				{status: 429}
			);
		}

		return register(request);

	}catch(error){

		return Response.json(
			{
				success: false,
				message: error.message
			},
			{status: 500}
		);
	}
};