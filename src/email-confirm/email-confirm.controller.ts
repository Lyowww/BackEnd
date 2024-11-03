import { Controller, Get, Res } from '@nestjs/common';
import { EmailConfirmService } from './email-confirm.service';

@Controller("mail")
export class EmailConfirmController {
	constructor(private readonly emailConfirmService: EmailConfirmService) {}

	@Get("/confirm")
	sendMailer(@Res() response: any) {
		const mail = this.emailConfirmService.sendConfirmMail("Need to change", "123456");

		return response.status(200).json({
		message: 'success',
		mail,
		});
	}
}