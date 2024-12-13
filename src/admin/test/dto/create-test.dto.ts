import { ArrayMinSize, IsArray, IsBoolean, IsInt, IsMongoId, Max, Min, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Question } from './question.dto';

export class CreateTestDto {
  @Type(() => Question)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  questions: Question[];

  @Type(() => Number)
  @IsInt()
  @Min(10 * 60)
  @Max(2 * 60 * 60)
  duration: number;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  published: boolean;

  @IsMongoId()
  job: Types.ObjectId;

  @IsMongoId()
  createdBy: Types.ObjectId;

  @IsMongoId()
  updatedBy: Types.ObjectId;
}
