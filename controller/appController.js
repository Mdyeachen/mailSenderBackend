const nodemailer = require("nodemailer");
const dotEnv = require("dotenv");
const path = require('path');

// dotEnv config
dotEnv.config();

const reseller = (req, res) => {
    
    const reciveData = req.body; // alll request body

    // validate check for email
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      }
    const mail =  isValidEmail(reciveData.mail) ? reciveData.mail : false; // customer mail


    const data = JSON.stringify(reciveData)

    //create a transporter
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
    });

    // mailer Option
    const mailerOption = {
        from: `"Yeachen Abir" <${process.env.USER}>`,
        to: "yeachenabir29@gmail.com", // recive email
        subject: "Hello World - Sending Email using Nodemailer",
        text: "Hello world?",
        html: data,
        replyTo : mail, // replay mail
        attachments: [
            {
                filename: "abc.txt",
                path: path.join(__dirname, "./../abc.txt"),
                contentType: "text/plain",
            },
        ],
    };

    transporter.sendMail(mailerOption)
        .then(() => {
            return res.status(201).json({message : " Email sent successfully"})
        })
        .catch(error => {
            return res.status(500).json({error})
        })



}



// export
module.exports = { reseller }