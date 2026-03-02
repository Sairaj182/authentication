const bcrypt = require('bcryptjs');
const userRepo = require('./repositories/user.repository');
const env = require('./config/env');

const initSuperAdmin = async()=>{
	try{
		const existing = await userRepo.findByEmail(env.SUPER_ADMIN_EMAIL);

		if(existing){
			console.log('SUPER_ADMIN already exists');
			return;
		}

		const hashedpass = await bcrypt.hash(env.SUPER_ADMIN_PASSWORD, 10);

		await userRepo.create({
			email: env.SUPER_ADMIN_EMAIL,
			password: hashedpass,
			role: 'SUPER_ADMIN',
			tokenVersion: 0,
		});

		console.log('SUPER_ADMIN created successfully');
	} catch(error){
		console.error('Error initializing SUPER_ADMIN:', error);
	}
};

module.exports = initSuperAdmin;