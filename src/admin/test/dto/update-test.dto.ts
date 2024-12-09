import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsMongoId,
  IsOptional,
  Max,
  Min,
  ValidateNested
} from 'class-validator';
import { Types } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { CreateTestDto } from './create-test.dto';
import { Question } from './question.dto';

export class UpdateTestDto extends PartialType(CreateTestDto) {
  @IsOptional()
  @Type(() => Question)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  questions: Question[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10 * 60)
  @Max(2 * 60 * 60)
  duration: number;

  @IsOptional()
  @IsBoolean()
  published: boolean;

  @IsOptional()
  @IsMongoId()
  job: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  createdBy: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  updatedBy: Types.ObjectId;
}
