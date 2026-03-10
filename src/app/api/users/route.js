const {getProfile,updateProfile} = require("@/controllers/user.controller");

exports.GET = async (request)=>{
	return getProfile(request);
};

exports.PUT = async (request)=>{
	return updateProfile(request);
};
