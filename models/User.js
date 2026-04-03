const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['jobseeker', 'employer', 'admin', 'superadmin'],
        default: 'jobseeker'
    },
    phone: { type: String },
    profileImage: { type: String },
    resume: { type: String }, // URL to PDF
    skills: [String],
    experience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    bio: { type: String },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
