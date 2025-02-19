const nodemailer = require("nodemailer")
const dotEnv = require("dotenv");
const path = require('path')

dotEnv.config();

const html = `
    <h1>Mail Sending</h1>
    <p>Send the mail</p>
`
//create a transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


const sendMail = async () => {
    try {
        const mailerOption = {
            from: `"Yeachen Abir" <${process.env.EMAIL_USER}>`,
            to: "mrony1989@gmail.com", // recive email
            subject: "Hello World - Sending Email using Nodemailer",
            text: "Hello world?",
            html: html,
            replyTo : "arshakhan320@gmail.com", // replay mail
            attachments: [
                {
                    filename: "abc.txt",
                    path: path.join(__dirname, "abc.txt"),
                    contentType: "text/plain",
                },
            ],
        };

        const info = await transporter.sendMail(mailerOption);
        console.log("✅ Email sent successfully: ", info.messageId);
    } catch (err) {
        console.error("❌ Error sending email: ", err);
    }
};



sendMail();
