import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Feedbacks, FeedbacksSchema } from "./entities/feedbacks.entity";
import { FeedbacksService } from "./feedbacks.service";
import { FeedbacksController } from "./feedbacks.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Feedbacks.name,
                schema: FeedbacksSchema,
            },
        ]),
    ],
    controllers: [FeedbacksController],
    providers: [JwtService, FeedbacksService],
})
export class FeedbacksModule {}
