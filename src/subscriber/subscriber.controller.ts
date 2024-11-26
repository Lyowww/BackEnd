import { Controller, Post, Get, Body } from '@nestjs/common';
import CreateSubscriberDto from './dto/createSubsciber';
import { SubscriberService } from './subscriber.service';

@Controller("subscriber")
export class SubscriberController {
	constructor(
		private readonly subscriberService: SubscriberService,
	) {}

	@Post()
	addSubscriber(@Body() subscriber: CreateSubscriberDto) {
		return this.subscriberService.addSubscriber(subscriber);
	}

	@Get()
	getAllSubscribers() {
		return this.subscriberService.getAllSubscribers();
	}

	@Get("newsletter")
	sendAllSubscribers() {
		return this.subscriberService.sendNewsletter();
	}
}