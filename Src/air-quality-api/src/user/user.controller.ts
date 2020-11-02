import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async register(@Body() model: RegisterUserDto): Promise<string> {
        return await this.userService.register(model);
    }
}
