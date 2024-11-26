import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {

	@IsNotEmpty()
	@IsString()
	email: string;
	}
  
export default CreateSubscriberDto;