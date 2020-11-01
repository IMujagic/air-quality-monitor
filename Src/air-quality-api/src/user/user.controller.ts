import { Body, Controller, Post } from '@nestjs/common';
import { ResultModel } from 'src/common/result.model';
import { LoginUserDto } from './dtos/login-user-dto';
import { RegisterUserDto } from './dtos/register-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async register(@Body() model: RegisterUserDto): Promise<ResultModel> {
        let id = await this.userService.register(model);

        if(id) {
            return <ResultModel> {
                status: 200,
                message: 'User created!',
                data: id
            }
        } else {
            return <ResultModel> {
                status: 400,
                message: 'Error occured!',
                data: null
            }
        }
    }
}
