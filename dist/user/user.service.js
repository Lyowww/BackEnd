"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../schemas/User.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const ConfirmUser_dto_1 = require("./dto/ConfirmUser.dto");
const email_confirm_service_1 = require("../email-confirm/email-confirm.service");
let UserService = class UserService {
    constructor(userModel, jwtService, emailConfirmService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailConfirmService = emailConfirmService;
    }
    async signUp(signUpDto) {
        const { username, email, rating, password } = signUpDto;
        const emailUniqueCheck = await this.userModel.findOne({ email: email });
        if (emailUniqueCheck) {
            throw new common_1.BadRequestException("User with this email already exists");
        }
        const usernameUniqueCheck = await this.userModel.findOne({ username: username });
        if (usernameUniqueCheck) {
            throw new common_1.BadRequestException("User with this username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, email, rating, password: hashedPassword });
        newUser.save();
        const code = Math.floor(100000 + Math.random() * 900000);
        signUpDto.code = String(code);
        this.emailConfirmService.sendConfirmMail(signUpDto.email, signUpDto.code);
        const token = this.jwtService.sign({ id: newUser._id });
        return { token };
    }
    confirmUser(confirmUserDto) {
        const code = ConfirmUser_dto_1.ConfirmUserDto;
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid username or password");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException("Invalid username or password");
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
    getUsers() {
        const users = this.userModel.find();
        return users;
    }
    getUserByID(id) {
        const user = this.userModel.findById(id);
        return user;
    }
    async getOneUser(email) {
        return this.userModel.findOne({ email: email });
    }
    updateUser(id, updateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
    deleteUser(id) {
        return this.userModel.findByIdAndDelete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        email_confirm_service_1.EmailConfirmService])
], UserService);
//# sourceMappingURL=user.service.js.map