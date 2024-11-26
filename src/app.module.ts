import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MailModule } from "./mail/mail.module";
import { SubscriberModule } from "./subscriber/subscriber.module";
import { JobCategoriesModule } from "./job-category/job-category.module";

const NODE_ENV = process.env.NODE_ENV;
require('dotenv').config()
const dotenv=require('dotenv');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            envFilePath: `.env.${NODE_ENV}`,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>("DB_URI"),
            }),
        }),
        MailModule,
        AuthModule,
        UserModule,
        JobCategoriesModule,
        SubscriberModule,
    ],
})
export class AppModule {}
