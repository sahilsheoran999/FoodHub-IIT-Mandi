const { COOKIE_SECURE } = require("../config/serverConfig");
const { loginUser } = require("../services/authService");


async function logout(req, res) {
    res.cookie("authToken", "", {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SECURE ? "none" : "lax",
        maxAge: 0
    });
    return res.status(200).json({
        success: true,
        message: "Log out successfull",
        error: {},
        data: {}
    });
}
async function login(req, res) {
    try {
        const loginPayload = req.body;

        if (!loginPayload || typeof loginPayload !== 'object') {
            return res.status(400).json({
                success: false,
                data: {},
                message: 'Invalid request body',
                error: { statusCode: 400, message: 'Invalid request body' }
            });
        }

        const email = loginPayload.email ? String(loginPayload.email).trim() : '';
        const password = loginPayload.password ? String(loginPayload.password) : '';

        if (!email) {
            return res.status(400).json({
                success: false,
                data: {},
                message: 'Email is required',
                error: { statusCode: 400, message: 'Email is required' }
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                data: {},
                message: 'Password is required',
                error: { statusCode: 400, message: 'Password is required' }
            });
        }

        const response = await loginUser({ email, password });
        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: COOKIE_SECURE,
            sameSite: COOKIE_SECURE ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData,
                token: response.token
            },
            error: {}
        })
    } catch(error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            message: error.message || 'Internal server error',
            error: error
        })
    }

}

module.exports = {
    login,logout
}