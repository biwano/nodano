const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const init = function init(nodano) {
  return {
    transporter_: null,
    get transporter() {
      if (this.transporter_ == null) this.transporter_ = nodemailer.createTransport(nodano.config.mail);
      return this.transporter_;
    },
    send: function send(mailOptions_, callback) {
      const mailOptions = mailOptions_;
      mailOptions.from = nodano.config.mail.from;
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          nodano.logger.error(error);
        }
        callback(error, info);
      });
    },
    sendTemplate: async function sendWithTemplate(templateName, to, payload, language, callback) {
      const subject = await nodano.template.render(`${language}/mail_${templateName}_subject`, payload);
      const html = await nodano.template.render(`${language}/mail_${templateName}`, payload);

      const mailOptions = {
        subject, html, to,
      };
      this.send(mailOptions, callback);
    },
  };
};

module.exports = { priority: 0, init };
