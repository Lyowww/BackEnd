import { Module } from "@nestjs/common";
import { EmailConfirmController } from "./email-confirm.controller";
import { EmailConfirmService } from "./email-confirm.service";

@Module({
    providers: [EmailConfirmService],
    controllers: [
        EmailConfirmController
    ]
})
export class EmailConfirmModule {}