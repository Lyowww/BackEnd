import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { NewsService } from "./news.service";
import { NewsDTO } from "./dto/news.dto";


@Controller("news")
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get("")
    getAll(@Query("page") page: string, @Query("limit") limit: string) {
        return this.newsService.getAll(parseInt(page), parseInt(limit));
    }

    @Get("search")
    search(@Query("page") page: string, @Query("limit") limit: string) {
        return this.newsService.search(parseInt(page), parseInt(limit));
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.newsService.findOne(new Types.ObjectId(id));
    }

    @UseGuards()
    @Post()
    create(@Body() body: NewsDTO) {
        return this.newsService.create(body);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() body: NewsDTO) {
        return this.newsService.update(new Types.ObjectId(id), body);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.newsService.delete(new Types.ObjectId(id));
    }
}
