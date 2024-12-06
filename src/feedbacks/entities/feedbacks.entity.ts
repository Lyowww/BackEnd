import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";

@Schema({ collection: "feedbacks" })
export class Feedbacks {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    status: "Pending" | "Fullfilled" | "Rejected ";
}

export const FeedbacksSchema = SchemaFactory.createForClass(Feedbacks);
