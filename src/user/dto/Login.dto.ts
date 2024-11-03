import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    username: string;

    @ApiProperty()
    @IsString()
    @MinLength(9)
    password: string;

}
