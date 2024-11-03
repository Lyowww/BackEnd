import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import nodemailer from "nodemailer";
import hbs from "handlebars"

@Injectable()
export class EmailConfirmService {
  	constructor(private readonly mailService: MailerService) {}

	public sendConfirmMail(email: string, code: string): void {
		this.mailService
			.sendMail({
			to: email, // list of receivers
			from: 'karo.galstyan.04@gmail.com', // sender address
			subject: 'Confirm Account', // Subject line
			text: 'welcome', // plaintext body'
			html: `<b>Your email was used for registration on Tjobs... Your verification code is ${code}</b>`, // HTML body content
			})
			.then(() => {})
			.catch(() => {});
	}
		
	// emailTransport() {
	// 	const transporter = nodemailer.createTransport({
	// 		host: ,
	// 		port: ,
	// 		secure: false,
	// 		auth: {
	// 			user: ,
	// 			pass: ,
	// 		},
	// 	})
	// 	return transporter
	// }
}