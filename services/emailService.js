const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

exports.sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"CareerConnect AI" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error('Email Error:', error);
        // Don't throw error to prevent breaking flow if email fails
    }
};

exports.sendInterviewInvitation = async (userEmail, interviewData) => {
    const subject = `Interview Invitation: ${interviewData.jobTitle}`;
    const html = `
    <h2>You've been invited for an interview!</h2>
    <p><strong>Job:</strong> ${interviewData.jobTitle}</p>
    <p><strong>Company:</strong> ${interviewData.companyName}</p>
    <p><strong>Date:</strong> ${new Date(interviewData.date).toDateString()}</p>
    <p><strong>Time:</strong> ${interviewData.time}</p>
    <p><strong>Link:</strong> <a href="${interviewData.link}">${interviewData.link}</a></p>
    <br/>
    <p>Good luck!</p>
  `;
    return this.sendEmail(userEmail, subject, '', html);
};
