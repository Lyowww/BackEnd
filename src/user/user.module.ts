import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailConfirmService } from "src/email-confirm/email-confirm.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>("JWT_SECRET"),
                    signOptions: {
                        expiresIn: config.get<string | number>("JWT_EXPIRES")
                    }
                }
            }
        }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema,
        }])
    ],
    providers: [UserService, EmailConfirmService],
    controllers: [
        UserController
    ]
})
export class UserModule {}