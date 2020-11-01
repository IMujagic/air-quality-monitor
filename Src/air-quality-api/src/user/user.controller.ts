import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './models/login-user-dto';
import { RegisterUserDto } from './models/register-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    register(@Body() model: RegisterUserDto): boolean {
        return this.userService.register(model);
    }
}
