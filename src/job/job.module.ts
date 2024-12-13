import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Job, JobsSchema } from "./entities/job.entity";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Job.name,
                schema: JobsSchema,
            },
        ]),
    ],
    controllers: [JobController],
    providers: [JwtService, JobService],
})
export class JobModule {}
