const { findUser, createUser } = require("../repositories/userRepository");
const { createcart } = require('../repositories/cartRepository');

async function registerUser(userDetails) {
    // It will create a brand new user in the db

    // 1. We need to check if a user with either this email or mobile number already exists
    const user = await findUser({
        $or: [
            { email: userDetails.email },
            { mobileNumber: userDetails.mobileNumber }
        ]
    });

    if(user) {
        const reason = user.email === userDetails.email 
            ? 'User with the given email already exists' 
            : 'User with the given mobile number already exists';
        throw { reason, statusCode: 400 };
    }
    
    // 2. If not then create the user in the database
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName || '', // Handle case where lastName is not provided
        mobileNumber: userDetails.mobileNumber
    });

    if(!newUser) {
        throw {reason: 'Something went wrong, cannot create user', statusCode: 500}
    }

    await createcart(newUser._id);

    // 3. return the details of created user (omit password)
    const userObj = newUser.toObject ? newUser.toObject() : { ...newUser._doc };
    delete userObj.password;
    return userObj;
}


async function getUserById(userId) {
    const user = await findUser({ _id: userId });
    if(!user) {
        throw { reason: 'User not found', statusCode: 404 };
    }
    const userObj = user.toObject ? user.toObject() : { ...user._doc };
    delete userObj.password;
    return userObj;
}

module.exports = {
    registerUser,
    getUserById
};