import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { FeedbacksDTO } from "./dto/feedbacks.dto";
import { FeedbacksService } from "./feedbacks.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { Role } from "src/user/entities/user.entity";
import { Roles } from "src/auth/role.decorator";

import { ParseObjectId } from "src/utils/pipes/parseObjectId.pipe";

// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.EMPLOYEE, Role.EMPLOYER, Role.MODERATOR)
@Controller("feedbacks")
export class FeedbacksController {
    constructor(private readonly feedbacksService: FeedbacksService) {}

    @Get()
    getAll() {
        return this.feedbacksService.getAll();
    }

    @Get("fullfilled")
    getAllFullfilled() {
        return this.feedbacksService.getAllFullfilled();
    }

    @Get(":id")
    findOne(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.feedbacksService.getById(id);
    }

    @Post()
    create(@Body() body: FeedbacksDTO) {
        return this.feedbacksService.create(body);
    }

    @Roles(Role.MODERATOR)
    @Patch(":id")
    update(@Param("id", ParseObjectId) id: Types.ObjectId, @Body() body: FeedbacksDTO) {
        return this.feedbacksService.update(id, body);
    }

    @Delete(":id")
    delete(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.feedbacksService.delete(id);
    }
}
