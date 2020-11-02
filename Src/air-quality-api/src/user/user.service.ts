import { ConflictException, Injectable, Post } from '@nestjs/common';
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

    async register(user: RegisterUserDto): Promise<any> {
        const existingUser = await this.findUser(user.email);

        if(existingUser !== null) {
            throw new ConflictException('User already exists!');
        } else {
            const hashed = await bcrypt.hash(user.password, 10);
            const newUser = new this.userModel({
                name: user.name,
                email: user.email,
                password: hashed
            });

            const result = await newUser.save();

            return { id: result.id };
        }
    }
}
