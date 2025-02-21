const nodemailer = require("nodemailer");
const dotEnv = require("dotenv");
const path = require('path');

// dotEnv config
dotEnv.config();

const reseller = (req, res) => {

    console.log(process.env.USER)
    
    const reciveData = req.body; // alll request body

    // validate check for email
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      }
    const clientMial = isValidEmail(reciveData.SendingMailAddress) ? reciveData.SendingMailAddress : false;
    const mail =  isValidEmail(reciveData.mail) ? reciveData.mail : false; // customer mail


    const data = reciveData
    let dataList = ""; // data list for email template
    for(let item in data){
        if (data.hasOwnProperty(item) && item !== 'SendingMailAddress') {
            dataList += `<li>${item} : ${data[item]}</li>`
        }
    }


    // email template with data
    const emailTemplate = `
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Email Sender</title>
    <style>*{box-sizing:border-box;margin:0;padding:0}table{width:100%;max-width:26rem;margin:0 auto;text-align:center}li{list-style:none}td.email-content{text-align:left;padding:1.5rem}td.email-content ul{padding:1rem;font-size:1rem}td.email-content li{padding:.5rem 0;font-weight:700;text-transform:capitalize}</style>
  </head>
  <body>
    <table class="email-body" cellspacing="0" cellpadding="0" border="0" align="center">
      <!-- Header -->
      <tr style="background-color: rgb(255, 255, 255); width: 100%; padding: 2rem;">
        <td class="email-header">
          <img src="https://cdn11.bigcommerce.com/s-yfjn5bpc6d/images/stencil/380x65/piercing-body-jewelry_1716392457__53588.original.png" alt="body Jewelry">
        </td>
      </tr>
      <!-- Content -->
      <tr>
        <td class="email-content">
          <h2>Hello</h2>
          <ul>
            ${dataList}
          </ul>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td class="email-footer" style="background-color: rgb(255, 255, 255); width: 100%; padding: 2rem;> 
          <p>
            &copy; 2025 <a href="https://bodyjewelry.com/">bodyjewelry.com</a>, All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

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
        to: [clientMial, "yeachenabir29@gmail.com"], // recive email
        subject: "Reseller Information",
        text: "Body Jewelry",
        replyTo : mail, // replay mail
        html: emailTemplate

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