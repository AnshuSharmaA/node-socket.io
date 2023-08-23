const db = require('../../database/database');
const Booking = db.Booking;
const Bookable = db.Bookable;
const Lane = db.Lane;
const list = async (req) => {

    try {
        const booking = await Booking.findAll({
            // where:{role_id:req.role_id},
            // attributes: ['name', 'email', 'role_id', 'location_id', 'company_id', 'email_verified_at', 'password'],
        });
        return booking;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
}

const lane_list = async (req) => {
    try {
        const lane = await Lane.findAll({
            // where:{role_id:req.role_id},
            // attributes: ['name', 'email', 'role_id', 'location_id', 'company_id', 'email_verified_at', 'password'],
        });
        return lane;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
}

const bookable_list = async (req) => {
    try {
        const bookable = await Bookable.findAll({
            // where:{role_id:req.role_id},
            // attributes: ['name', 'email', 'role_id', 'location_id', 'company_id', 'email_verified_at', 'password'],
        });
        return bookable;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
}
module.exports = { list, bookable_list, lane_list }