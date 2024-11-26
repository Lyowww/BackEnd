import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscriber, SubscriberSchema } from './subscriber.entity';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([ {
      name: Subscriber.name,
      schema: SubscriberSchema
    } ])
  ],
  providers: [SubscriberService],
  exports: [],
  controllers: [SubscriberController],
})

export class SubscriberModule {}