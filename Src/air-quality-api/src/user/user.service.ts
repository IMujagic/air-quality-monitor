import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos/login-user-dto';
import { RegisterUserDto } from './dtos/register-user-dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findUser(email: string): Promise<User> {
        return this.userModel.findOne({ email: email }).exec();
    }

    async register(user: RegisterUserDto): Promise<string> {
        if(!this.isValid(user)) {
            return null;
        }

        const hashed = await bcrypt.hash(user.password, 10);
        const newUser = new this.userModel({
            name: user.name,
            email: user.email,
            password: hashed
        });

        const result = await newUser.save();

        return result.id;
    }

    private isValid(user: RegisterUserDto): boolean {
        if(!user.password || user.password.length < 4) {
            return false;
        }
        if(user.password !== user.passwordConfirm) {
            return false;
        }

        return true;
    }
}
