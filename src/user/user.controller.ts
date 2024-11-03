import { Body, Controller, Delete, Get, HttpException, Inject, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignUpDto } from "./dto/SignUp.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { LoginDto } from "./dto/Login.dto";
import { EmailConfirmService } from "src/email-confirm/email-confirm.service";

@Controller("users")
export class UserController {

    constructor(private userService: UserService) {}

    @Post("/signup")
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        
        
        
        return this.userService.signUp(signUpDto);
    }
    
    @Get("/login")
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.userService.login(loginDto);
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(":id")
    async getUserByID(@Param("id") id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) {throw new HttpException("User not found", 404)}
        const user = await this.userService.getUserByID(id);
        if (!user) {
            throw new HttpException("User not found", 404);
        }
        return user
    }
    
    @Patch(":id")
    async updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) {throw new HttpException("Invalid ID", 400)}
        const user = await this.userService.getUserByID(id);
        if (!user) {
            throw new HttpException("User not found", 404);
        }
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) {throw new HttpException("Invalid ID", 400)}
        const user = await this.userService.getUserByID(id);
        if (!user) {
            throw new HttpException("User not found", 404);
        }
        return this.userService.deleteUser(id);
    }

}
