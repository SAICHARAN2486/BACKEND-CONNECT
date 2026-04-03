require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/careerconnect');
        
        const existingAdmin = await User.findOne({ email: 'admin@system.com' });
        if (existingAdmin) {
            console.log('Admin already exists! Email: admin@system.com | Password: AdminPassword123!');
            // Force role to be admin just in case
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('AdminPassword123!', salt);

        const adminUser = new User({
            name: 'System Admin',
            email: 'admin@system.com',
            password: hashedPassword,
            role: 'admin',
            skills: ['Platform Management'],
            education: []
        });

        await adminUser.save();
        console.log('Admin created successfully! Email: admin@system.com | Password: AdminPassword123!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
