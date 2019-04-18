const nodemailer = require ('nodemailer');

exports.sendWellcomeMail = function(userStored){
	// Send email.
	let transporter = nodemailer.createTransport ({
		service: 'gmail',
		auth: {//Activar para permitir usar cuenta gmail
			user: 'aedtrainingbox@gmail.com',//https://myaccount.google.com/u/1/lesssecureapps
			pass: 'Trnngbx7_'
		}
	});

	const mailOptions = {
		from: 'aedtrainingbox@gmail.com',
		to: userStored.email, //user.mailReceiver,
		subject: 'Bienvenid@ a EAD Training Box!',
		text: 'Nombre de usuario: ' + userStored.email + ' | ' + 'Contraseña: ' + userStored.password
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if(err) console.log(err);
		else console.log(info);
	});
}