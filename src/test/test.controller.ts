import { Controller, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { TestService } from './test.service';
import { ParseObjectId } from "../utils/pipes/parseObjectId.pipe";

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get(':id')
  findOne(@Param('id', ParseObjectId) id: Types.ObjectId) {
    return this.testService.findOne(id);
  }

  @Post('check')
  check() {
    return this.testService.check();
  }
}
