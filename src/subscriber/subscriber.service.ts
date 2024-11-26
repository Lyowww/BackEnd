import { Injectable } from '@nestjs/common';
import { Subscriber } from './subscriber.entity';
import CreateSubscriberDto from './dto/createSubsciber';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SubscriberService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Subscriber.name)
    private readonly subscriberModel: Model<Subscriber>
  ) {}

  async addSubscriber(subscriber: CreateSubscriberDto) {
    const newSubscriber = await this.subscriberModel.create(subscriber);
    await newSubscriber.save();
    return newSubscriber;
  }

  async getAllSubscribers() {
    return this.subscriberModel.find();
  }

  async sendNewsletter() {
    const emails = await this.subscriberModel.find();
    const emailadrss = emails.map(obj => obj.email);
    await this.mailerService.sendMail({
      to: emailadrss,
      subject: 'Welcome to TJobs App! Confirm your Email',
      template: 'confirmation',
      context: {
        text: `texttexttexttexttexttexttexttexttexttexttexttext`
      }
    });
  }
}
