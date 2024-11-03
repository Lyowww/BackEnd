import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule } from '@nestjs/config';
import { EmailConfirmModule } from './email-confirm/email-confirm.module';
// import { CacheModule } from '@nestjs/cache-manager';

@Module({
	imports: [
		// CacheModule.register(),
		MongooseModule.forRoot("mongodb://127.0.0.1/demo"),
		UserModule,
		EmailConfirmModule,
		ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
		MailerModule.forRoot({
			transport: {
				host: String(process.env.MAIL_HOST),
				port: Number(process.env.MAIL_PORT),
				secure: false,
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASS,
				},
			},
			defaults: {
				from: '"nest-modules" <modules@nestjs.com>',
			},
			template: {
				dir: __dirname + '/templates',
				adapter: new PugAdapter(),
				options: {
				strict: true,
				},
			},
		})
	],
	controllers: [],
	providers: [],
})

export class AppModule {}

