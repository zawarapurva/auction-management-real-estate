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
        from: 'zawarapurva24@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Auction Winner', // Subject line
        html: '<p>Congragulations on your new place!! You are the winner for auction </p>'+ title// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
