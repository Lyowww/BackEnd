import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { SignUpDto } from "./dto/SignUp.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/Login.dto";
import { ConfirmUserDto } from "./dto/ConfirmUser.dto";
import { EmailConfirmService } from "src/email-confirm/email-confirm.service";
export declare class UserService {
    private userModel;
    private jwtService;
    private readonly emailConfirmService;
    constructor(userModel: Model<User>, jwtService: JwtService, emailConfirmService: EmailConfirmService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    confirmUser(confirmUserDto: ConfirmUserDto): void;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    getUsers(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, User, "find", {}>;
    getUserByID(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, User, "findOne", {}>;
    getOneUser(email: string): Promise<User | undefined>;
    updateUser(id: string, updateUserDto: UpdateUserDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, User, "findOneAndUpdate", {}>;
    deleteUser(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, User, "findOneAndDelete", {}>;
}
