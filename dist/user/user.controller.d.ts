import { UserService } from "./user.service";
import { SignUpDto } from "./dto/SignUp.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { LoginDto } from "./dto/Login.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    getUsers(): mongoose.Query<(mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & {
        _id: mongoose.Types.ObjectId;
    })[], mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & {
        _id: mongoose.Types.ObjectId;
    }, {}, import("../schemas/User.schema").User, "find", {}>;
    getUserByID(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteUser(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & {
        _id: mongoose.Types.ObjectId;
    }>;
}
