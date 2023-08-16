const db = require('../../database/database');
const User = db.User;
const list = async (req, resp) => {
    try {
        const users = await User.findAll({
            attributes: ['name', 'email', 'role_id', 'location_id', 'company_id', 'email_verified_at', 'password'],
        });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
module.exports = { list }
