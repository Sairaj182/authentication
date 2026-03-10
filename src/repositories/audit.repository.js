const AuditLog = require("../models/auditLog.model");

class AuditRepository {

	async log(data){
		return await AuditLog.create(data);
	}

}

module.exports = new AuditRepository();