const userRepo = require("../repositories/user.repository");
const AppError = require("../errors/AppError");

class UserService {

	async getProfile(userId) {
		const user = await userRepo.findByPk(id, {
			attributes: { exclude: ["password", "refreshToken", "tokenVersion"] }
		});
		if (!user) throw new AppError("User not found",404);
		return user;
	}

	async updateProfile(userId,data) {
		const user = await userRepo.findByPk(id, {
			attributes: { exclude: ["password", "refreshToken", "tokenVersion"] }
		});
		if (!user) throw new AppError("User not found",404);

		await user.update(data);
		return user;
	}

	async getUserById(id){
		const user = await userRepo.findByPk(id, {
			attributes: { exclude: ["password", "refreshToken", "tokenVersion"] }
		});
		if(!user) throw new AppError("User not found",404);
		return user;
	}

	async updateUserByAdmin(id,data){
		const user = await userRepo.findByPk(id, {
			attributes: { exclude: ["password", "refreshToken", "tokenVersion"] }
		});
		if(!user) throw new AppError("User not found",404);

		await user.update(data);
		return user;
	}

	async deleteUser(id){
		const user = await userRepo.findById(id);
		if(!user) throw new AppError("User not found",404);

		await user.destroy();
		return true;
	}

}

module.exports = new UserService();