import { Injectable, Post } from '@nestjs/common';
import { LoginUserDto } from './models/login-user-dto';
import { RegisterUserDto } from './models/register-user-dto';

@Injectable()
export class UserService {
    private readonly users: LoginUserDto[];

    // TODO: remove this and check against db
    constructor() {
        this.users = [
            {
                email: 'john@test.com',
                password: 'changeme',
            },
            {
                email: 'chris@test.com',
                password: 'secret',
            },
            {
                email: 'maria@test.com',
                password: 'guess',
            },
        ];
    }

    async findUser(email: string): Promise<LoginUserDto> {
        return this.users.find(user => user.email === email);
    }

    register(user: RegisterUserDto): boolean {
        return true;
    }
}
