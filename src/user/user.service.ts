import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { SignUpDto } from "./dto/SignUp.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/Login.dto";
import { ConfirmUserDto } from "./dto/ConfirmUser.dto";
import { EmailConfirmService } from "src/email-confirm/email-confirm.service";
// import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly emailConfirmService: EmailConfirmService,
        // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}
    
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        // const cache = createCache({
        //     ttl: 10000,
        //     refreshThreshold: 3000,
        // })
        const {username, email, password} = signUpDto
        const emailUniqueCheck = await this.userModel.findOne({ email: email })
        if ( emailUniqueCheck ) {
            throw new BadRequestException("User with this email already exists")
        }
        const usernameUniqueCheck = await this.userModel.findOne({ username: username })
        if ( usernameUniqueCheck ) {
            throw new BadRequestException("User with this username already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new this.userModel({username, email, password: hashedPassword});
        newUser.save();
        const code = Math.floor(100000 + Math.random() * 900000);
        signUpDto.code = String(code)
        this.emailConfirmService.sendConfirmMail(signUpDto.email, signUpDto.code);
        const token = this.jwtService.sign({ id: newUser._id });
        return { token };
    }

    confirmUser(confirmUserDto: ConfirmUserDto) {
        const code = ConfirmUserDto;

    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const {username, password} = loginDto
        const user = await this.userModel.findOne({ username })
        if ( !user ) {
            throw new UnauthorizedException("Invalid username or password")
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if ( !isPasswordMatched ) {
            throw new UnauthorizedException("Invalid username or password")
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }

    getUsers() {
        const users = this.userModel.find()
        return users
    }

    getUserByID(id: string) {
        const user = this.userModel.findById(id)
        return user
    }

    async getOneUser(email: string): Promise<User | undefined> {
        return this.userModel.findOne( { email: email } )
      }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

}