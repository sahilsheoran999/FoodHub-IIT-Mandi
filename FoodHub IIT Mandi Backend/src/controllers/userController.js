const { registerUser, getUserById } = require('../services/userService');
const AppError = require('../utils/appError');

async function createUser(req, res) {
    try {
        const response = await registerUser(req.body);
        return res.status(201).json({
            message: 'Successfully registered the user',
            success: true,
            data: response,
            error: {}
        });
    } catch(error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || error.message || 'Internal server error',
            data: {},
            error: error
        });
    }
}

async function getUserProfile(req, res) {
    try {
        const response = await getUserById(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the user details',
            data: response,
            error: {}
        });
    } catch(error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || error.message || 'Internal server error',
            data: {},
            error: error
        });
    }
}

module.exports = {
    createUser,
    getUserProfile
};