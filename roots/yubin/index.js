import mail_model from './models/Mail.js';

export default async function (app, opts) {
  app.get("/inbox", async (req, res) => {
    if (req.is_auth) {
      res.code(200).send(await mail_model.find({}, "to from date subject text").sort({ date: 'desc' }).map(mails => {
        mails.forEach(mail => {mail.text = mail.text.slice(0, 80); return mail});
        return mails;
      }).exec());
    }
    else
      res.code(401).send({ message: "Missing permission 🔒" });
  });
  app.get("/mail/:mail_id", async (req, res) => {
    if (req.is_auth) {
      res.code(200).send(await mail_model.findById(req.params.mail_id, "to from date subject textAsHtml").exec());
    }
    else
      res.code(401).send({ message: "No logged user 🔒" });
  });

  app.post("/mail", async (req, res) => {
    if (req.is_auth) {
      var raw_mail = { ...req.body }
      raw_mail.to = raw_mail.to.value;
      raw_mail.from = raw_mail.from.value[0];
      raw_mail.html = raw_mail.html == "false" ? raw_mail.textAsHtml : raw_mail.html;

      const mail = new mail_model({ ...raw_mail });
      await mail.save();
      res.code(201).send(mail);
    }
    else
      res.code(401).send({ message: "Missing permission 🔒" });
  });
}