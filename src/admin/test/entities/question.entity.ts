import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './answer.entity';

export enum AnswerType {
  RADIO = 'radio',
  SELECT = 'select'
}

@Schema({ timestamps: true, versionKey: false })
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [ AnswerSchema ], required: true })
  answers: Answer[];

  @Prop({ type: String, enum: AnswerType, default: AnswerType.RADIO })
  answersType: AnswerType;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
