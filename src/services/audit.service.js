const auditRepo = require("../repositories/audit.repository");

class AuditService {

	async log(action, performedBy, targetUser, meta = {}){

		return await auditRepo.log({
			action,
			performedBy,
			targetUser,
			meta
		});

	}

}

module.exports = new AuditService();