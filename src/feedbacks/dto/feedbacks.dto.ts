import { IsBoolean, IsInt, IsNotEmpty, IsString, Length } from "class-validator";
import { Types } from "mongoose";

export class FeedbacksDTO {
    @IsNotEmpty()
    userId: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @Length(2, 600)
    text: string;

    @IsNotEmpty()
    @IsString()
    status: "Pending" | "Fullfilled" | "Rejected ";
}
