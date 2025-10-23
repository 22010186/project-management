import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "845c5d517f838c",
    pass: "a5c06b597e72c2",
  },
});

export default transport;
