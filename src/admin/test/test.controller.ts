import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { Types } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TestService } from './test.service';
import { RoleGuard } from '../../auth/role.guard';
import { Roles } from '../../auth/role.decorator';
import { Role } from '../../user/entities/user.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AuthGuard, RequestWithUser } from '../../auth/auth.guard';
import { ParseObjectId } from '../../utils/pipes/parseObjectId.pipe';
import { multer } from '../../utils/multer';

@Controller('admin/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Post()
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'questions[0][answers][0][image]', maxCount: 1 },
      { name: 'questions[0][answers][1][image]', maxCount: 1 },
      { name: 'questions[0][answers][2][image]', maxCount: 1 },
      { name: 'questions[0][answers][3][image]', maxCount: 1 }
    ],
    multer
  ))
  create(
    @Req() req: RequestWithUser,
    @Body() createTestDto: CreateTestDto,
    @UploadedFiles() images: { [key: string]: Express.Multer.File[] }
  ) {
    return this.testService.create(req.user, createTestDto, images);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Get(':id')
  findOne(@Param('id', ParseObjectId) id: Types.ObjectId) {
    return this.testService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'answers[0][image]', maxCount: 1 },
      { name: 'answers[1][image]', maxCount: 1 },
      { name: 'answers[2][image]', maxCount: 1 },
      { name: 'answers[3][image]', maxCount: 1 }
    ],
    multer
  ))
  update(
    @Req() req: RequestWithUser,
    @Param('id', ParseObjectId) id: Types.ObjectId,
    @Body() updateTestDto: UpdateTestDto,
    @UploadedFiles() images: { [key: string]: Express.Multer.File[] }
  ) {
    return this.testService.update(req.user, id, updateTestDto, images);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Delete(':id')
  remove(@Req() req: RequestWithUser, @Param('id', ParseObjectId) id: Types.ObjectId) {
    return this.testService.remove(req.user, id);
  }
}
