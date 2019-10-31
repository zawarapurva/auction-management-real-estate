var nodemailer = require('nodemailer');

exports.mailService = (email, title) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zawarapurva24@gmail.com',
            pass: 'sangeetanand07051997'
        }
    });
    const mailOptions = {
        from: 'zawarapurva24@gmail.com',
        to: email,
        subject: 'Auction Winner',
        html: '<p>Congragulations on your new place!! You are the winner for auction </p>'+ title
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
