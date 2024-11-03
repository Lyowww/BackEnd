import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailConfirmService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendConfirmMail(email: string, code: string): void;
}
