import { Injectable, Post } from '@nestjs/common';
import { LoginUserDto } from './models/login-user-dto';
import { RegisterUserDto } from './models/register-user-dto';

@Injectable()
export class UserService {
    
    checkCredentials(model: LoginUserDto): boolean {
        if(model.email == 'test@test.com' && model.password == '1234') {
            return true;
        }
        else {
            return false;
        }
    }

    register(user: RegisterUserDto): boolean {
        return true;
    }
}
