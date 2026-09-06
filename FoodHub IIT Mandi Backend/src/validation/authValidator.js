const jwt = require('jsonwebtoken');
const { JWT_SECRET, COOKIE_SECURE, FRONTEND_URL } = require('../config/serverConfig');
const UnAuthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next) {
    let token = req.cookies ? req.cookies["authToken"] : null;
    
    // Also support Authorization header (Bearer <token>) for cross-domain compatibility
    if (!token && req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }

    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) {
            throw new UnAuthorisedError();
        }
        
        const User = require('../schema/userSchema');
        const userExists = await User.findById(decoded.id);
        if(!userExists) {
            throw new UnAuthorisedError();
        }

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }

        next();
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            res.cookie("authToken", "", {
                httpOnly: true,
                sameSite: COOKIE_SECURE ? "none" : "lax",
                secure: COOKIE_SECURE,
                maxAge: 0
            });
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again.",
                error: error,
                data: {}
            });
        }
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid Token provided"
        });
    }
}

/**
 * This function checks if the authenticated user is an admin or not ?
 * Becuase we will call isAdmin after isLoggedIn thats why we will receive user details
 */
function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    if(loggedInUser.role === "ADMIN") {
        next();
    } else {
        return res.status(401).json({
            success: false,
            data:{},
            message: "You are not authorised for this action",
            error: {
                statusCode: 401,
                reason: "Unauthorised user for this action"
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}