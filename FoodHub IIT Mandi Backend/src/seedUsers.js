const mongoose = require('mongoose');
const User = require('./schema/userSchema');
const Cart = require('./schema/cartSchema');
const serverConfig = require('./config/serverConfig');

const usersToSeed = [
  {
    firstName: "Test",
    lastName: "User",
    email: "user@foodhub.com",
    password: "password123",
    mobileNumber: "9876543210",
    role: "USER"
  },
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@foodhub.com",
    password: "adminpassword",
    mobileNumber: "9999999999",
    role: "ADMIN"
  }
];

async function seedUsers() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Connected.");

        for (const userData of usersToSeed) {
            console.log(`Processing user: ${userData.email}...`);
            // Clean up existing user
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                await Cart.deleteOne({ user: existingUser._id });
                await User.deleteOne({ _id: existingUser._id });
            }

            // Create user
            // We use new User + save to trigger pre-save bcrypt hook
            const user = new User(userData);
            await user.save();

            // Create cart
            await Cart.create({ user: user._id });
            console.log(`User ${userData.email} and cart created successfully!`);
        }

    } catch (error) {
        console.error("Error seeding users:", error);
    } finally {
        await mongoose.connection.close();
        console.log("DB connection closed.");
    }
}

seedUsers();
