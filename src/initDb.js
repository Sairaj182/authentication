const syncDb = require("./config/sync");

let initialized = false;
const initSuperAdmin = require('./initSuperAdmin');

const initDb = async()=>{
	if(!initialized){
		await syncDb();
		await initSuperAdmin();
		initialized = true;
		console.log("DB Created..\nSuperAdmin Created...");
	}
};

module.exports = initDb;