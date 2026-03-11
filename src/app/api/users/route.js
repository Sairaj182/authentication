const {getProfile,updateProfile} = require("@/controllers/user.controller");

exports.GET = async (request)=>{
	return getProfile(request);
};

exports.PATCH = async (request)=>{
	return updateProfile(request);
};
