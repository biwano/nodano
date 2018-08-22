const nodemailer = require('nodemailer');
const config = require('../config');
const templateHelper = require('./template.helper');
const logger = require('./logger.helper');

// create reusable transporter object using the default SMTP transport
const mailer = {
  transporter_: null,
  get transporter() {
    if (this.transporter_ == null) this.transporter_ = nodemailer.createTransport(config.mail);
    return this.transporter_;
  },
  send: function send(mailOptions_, callback) {
    const mailOptions = mailOptions_;
    mailOptions.from = config.mail.from;
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(error);
      }
      callback(error, info);
    });
  },
  sendTemplate: async function sendWithTemplate(templateName, to, payload, language, callback) {
    const subject = await templateHelper.render(`${language}/mail_${templateName}_subject`, payload);
    const html = await templateHelper.render(`${language}/mail_${templateName}`, payload);

    const mailOptions = {
      subject, html, to,
    };
    this.send(mailOptions, callback);
  },

};
module.exports = mailer;
