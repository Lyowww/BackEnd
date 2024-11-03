import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    username: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message: "Incorrect email" })
    email: string;

    // @ApiProperty()
    // rating: number;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // address: string;

    code: string;

    @ApiProperty()
    @IsString()
    @MinLength(9)
    password: string;

}
