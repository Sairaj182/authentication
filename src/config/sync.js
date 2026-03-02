const sequelize = require("./db");

const syncDb = async()=>{
	try{
		await sequelize.authenticate();
		console.log("DB Connected");
		await sequelize.sync({ alter: true });
		console.log("DB Synced");
	}catch(error){
		console.error("DB Error:", error);
	}
};

module.exports = syncDb;