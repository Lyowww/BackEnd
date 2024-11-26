import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Subscriber {
	@Prop({ unique: true, required: true})
	email: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);