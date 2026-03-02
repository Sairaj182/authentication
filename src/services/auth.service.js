const {generateAccessToken,generateRefreshToken} = require('../utils/jwt');
const userRepo = require('../repositories/user.repository');
const env = require('../config/env');
const bcrypt = require('bcryptjs');
const AppError = require('../errors/AppError.js');
const jwt = require('jsonwebtoken');

class AuthService {
    async login({email, password}) {
        const user = await userRepo.findByEmail(email);
        if (!user) throw new AppError('Invalid credentials', 401);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AppError('Invalid credentials', 401);

        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion,
        });
        const refreshToken = generateRefreshToken({
            id: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion,
        });
        user.refreshToken = await bcrypt.hash(refreshToken, 10);
        await user.save();
        return { accessToken, refreshToken, role: user.role };
    }

    async refreshToken({refreshToken}) {
        if(!refreshToken) throw new AppError('Refresh token is required', 401);
        const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
        const user = await userRepo.findById(payload.id);
        if(!user || !refreshToken) throw new AppError('Invalid or expired refresh token', 401);
        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if(!isMatch) throw new AppError('Invalid or expired refresh token',401);
        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion,
        });
        return {accessToken};
    }

    async register(newUser, creator) {
        const {email,password,role} = newUser;
        const existing = await userRepo.findByEmail(email);
        const newRole = role || "USER";
        if(existing) throw new AppError('User already exists', 409);
        if(creator){
            const {ROLE_HIERARCHY} = require('../constants/roles');
            const clevel = ROLE_HIERARCHY[creator.role];
            const newlevel = ROLE_HIERARCHY[newRole];
            if(newlevel>clevel){
                throw new AppError('Forbidden',403);
            }
        }
        const hashedPass = await bcrypt.hash(password,10);
        const user = await userRepo.create({email, password:hashedPass, role: newRole});
        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion
        });
        const refreshToken = generateRefreshToken({
            id: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion
        });
        const safeUser = { email: user.email, role: user.role };
        return {user:safeUser,accessToken,refreshToken};
    }

    async listUsers() {
        return await userRepo.getAll();
    }

    async logout(userId) {
        const user = await userRepo.findById(userId);
        if (!user) return;
        user.refreshToken = null;
        user.tokenVersion += 1;
        await user.save();
    }
}

module.exports = new AuthService();
