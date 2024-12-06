import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Feedbacks } from "./entities/feedbacks.entity";
import { FeedbacksDTO } from "./dto/feedbacks.dto";

@Injectable()
export class FeedbacksService {
    constructor(
        @InjectModel(Feedbacks.name)
        private readonly FeedbacksModel: Model<Feedbacks>,
    ) {}

    async getAll() {
        return this.FeedbacksModel.find();
    }
    
    async getById(id: Types.ObjectId,) {
        return this.FeedbacksModel.findById(id);
    }

    async getAllFullfilled() {
        return this.FeedbacksModel.find({ status: "Fullfilled" });
    }

    async create(feedback: FeedbacksDTO) {        
        feedback.userId = new Types.ObjectId(feedback.userId)
        const newFeedback = await this.FeedbacksModel.create(feedback);
        await newFeedback.save();
        return newFeedback;
    }

    async update(id: Types.ObjectId, feedback: FeedbacksDTO) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const updatefeedback = await this.FeedbacksModel.findByIdAndUpdate(id, { ...feedback }, { new: true });

        if (!updatefeedback) throw new NotFoundException(`Feedback not found`);

        return updatefeedback;
    }

    async delete(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const feedback = await this.FeedbacksModel.findByIdAndDelete({ _id: id });
        if (!feedback) throw new NotFoundException(`Feedback not found`);

        return feedback;
    }
}
