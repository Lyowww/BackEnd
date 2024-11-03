import { EmailConfirmService } from './email-confirm.service';
export declare class EmailConfirmController {
    private readonly emailConfirmService;
    constructor(emailConfirmService: EmailConfirmService);
    sendMailer(response: any): any;
}
