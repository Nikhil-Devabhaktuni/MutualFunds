const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "my@gmail.com",
    pass: "password",
  }
});

const otp = Math.floor(1000 + Math.random() * 9000);


app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  // Verify the OTP code
  // In this example, we are using a hardcoded value for demonstration purposes only.
  // In a real application, you should compare the OTP to the one generated in the previous step.
  
  if (otp === this.otpCode && otp!=0) {
    print("otp");
    print("otp"+otp);
    print(this.otpCode+"this otp");
    console.log(otp);
    console.log(this.otpCode);
    res.status(200).send({ message: 'Login successful' });
    
  } else {
    res.status(401).send({ message: 'Invalid OTP' });
  }
});

app.post("/generateOTP", (req, res) => {
  const { email } = req.body;

  // Generate a new OTP code and send it via email
  this.otpCode = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: "my@gmail.com",
    to: email,
    subject: "LogIn OTP",
    text: `Your OTP code is ${this.otpCode}.`,
  };

  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {
      console.error('Error sending email: ', error);
      res.status(500).send({ message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent: ', this.otpCode);
      res.status(200).send({ message: 'OTP sent successfully' });
    }
  });
});