const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zara.khan20047@gmail.com',
    pass: 'ujuoslhmcpqgkilf', 
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.error('Email setup error:', err);
  } else {
    console.log('Ready to send emails');
  }
});


const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

const sendResetEmail = async (to, resetLink) => {
  const subject = 'Password Reset Request';
  const text = `Click the following link to reset your password: ${resetLink}`;
  return sendEmail(to, subject, text);
};

module.exports = {
  sendEmail,
  sendResetEmail,
};
