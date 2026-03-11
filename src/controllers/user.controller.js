const { NextResponse } = require("next/server");
const { protect } = require("../middleware/auth.middleware");
const userService = require("../services/user.service");
const { updateProfileSchema } = require("../validations/profile.validation");

exports.getProfile = async (request)=>{
	try{
		const user = await protect(request);
		const profile = await userService.getProfile(user.id);

		return NextResponse.json({
			success: true,
			profile,
		});
	}catch(error){
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: error.statusCode || 500 }
		);
	}
};

exports.updateProfile = async (request)=>{
	try{
		const user = await protect(request);
		const body = await request.json();
		const validated = updateProfileSchema.parse(body);
		const updated = await userService.updateProfile(user.id, validated);

		return NextResponse.json({
			success: true,
			message: "Profile updated successfully",
			profile: updated,
		});
	}catch(error){
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: error.statusCode || 500 }
		);
	}
};

exports.updateUserByAdmin = async (request, id) => {
	try {

		const body = await request.json();

		const updated = await userService.updateUserByAdmin(id, body);

		return NextResponse.json({
			success: true,
			message: "User updated successfully",
			user: updated
		});

	} catch(error){

		return NextResponse.json(
			{ success:false, message:error.message },
			{ status:error.statusCode || 500 }
		);

	}
};

exports.getUserById = async (request, id) => {
	try {
		const user = await userService.getUserById(id);
		return NextResponse.json({
			success: true,
			user
		});
	} catch(error){
		return NextResponse.json(
			{ success:false, message:error.message },
			{ status:error.statusCode || 500 }
		);
	}
};

exports.deleteUser = async (request, id) => {
	try {

		const deleted = await userService.deleteUser(id);

		return NextResponse.json({
			success: true,
			message: "User deleted successfully",
			user: deleted
		});

	} catch (error) {

		return NextResponse.json(
			{ success:false, message:error.message },
			{ status:error.statusCode || 500 }
		);

	}
};