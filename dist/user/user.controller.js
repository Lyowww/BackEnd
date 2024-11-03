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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const SignUp_dto_1 = require("./dto/SignUp.dto");
const mongoose_1 = require("mongoose");
const UpdateUser_dto_1 = require("./dto/UpdateUser.dto");
const Login_dto_1 = require("./dto/Login.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    signUp(signUpDto) {
        return this.userService.signUp(signUpDto);
    }
    login(loginDto) {
        return this.userService.login(loginDto);
    }
    getUsers() {
        return this.userService.getUsers();
    }
    async getUserByID(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.HttpException("User not found", 404);
        }
        const user = await this.userService.getUserByID(id);
        if (!user) {
            throw new common_1.HttpException("User not found", 404);
        }
        return user;
    }
    async updateUser(id, updateUserDto) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.HttpException("Invalid ID", 400);
        }
        const user = await this.userService.getUserByID(id);
        if (!user) {
            throw new common_1.HttpException("User not found", 404);
        }
        return this.userService.updateUser(id, updateUserDto);
    }
    async deleteUser(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.HttpException("Invalid ID", 400);
        }
        const user = await this.userService.getUserByID(id);
        if (!user) {
            throw new common_1.HttpException("User not found", 404);
        }
        return this.userService.deleteUser(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("/signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignUp_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByID", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map