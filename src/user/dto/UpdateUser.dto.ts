import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @ApiProperty()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsString()
    surname?: string;

    @ApiProperty()
    @IsString()
    email?: string;

    @ApiProperty()
    @IsString()
    address?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatarUrl?: string;
}