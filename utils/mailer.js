const { transporter } = require('../config/mail.config.js');
// const User = require('../models/userModel.js');


const sendVerificationEmail = async (user, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${user.email}`;
    
    console.log(process.env.SMTP_USER);
    console.log(process.env.SMTP_PASS);
  console.log(user.email);
  console.log(verificationUrl);

  const mailOptions = {
    from: ` "My_Login_App" <${process.env.SMTP_USER}> `,
    to: user.email,
    subject: 'Email verification - My_Login_App',
    html: `
    <p>Hi ${user.fullname || user.name},</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationUrl}">Verify Email</a>
    `
  };
  await transporter.sendMail(mailOptions);

}


module.exports = {sendVerificationEmail};

