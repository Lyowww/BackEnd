import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Job } from '../../../job/entities/job.entity';
import { User } from '../../../user/entities/user.entity';
import { Question, QuestionSchema } from './question.entity';

@Schema({ timestamps: true, versionKey: false })
export class Test {
  @Prop({ type: [ QuestionSchema ], required: true })
  questions: Question[];

  @Prop({ required: true })
  duration: number;

  @Prop({ default: false })
  published: boolean;

  @Prop({ type: Types.ObjectId, ref: Job.name })
  job: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  updatedBy: Types.ObjectId;
}

export const TestSchema = SchemaFactory.createForClass(Test);
