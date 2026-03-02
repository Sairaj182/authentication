const {Sequelize} = require("sequelize");
const env = require("./env");

let sequelize;

if(!global._sequelize){
	sequelize = new Sequelize(
		env.DB_NAME,
		env.DB_USER,
		env.DB_PASS,
		{
			host: env.DB_HOST,
			dialect: "mysql",
			logging: false,
		}
	);
	global._sequelize = sequelize;
}else{
	sequelize = global._sequelize;
}

module.exports = sequelize;