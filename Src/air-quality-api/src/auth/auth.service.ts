import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, providedPassword: string): Promise<any> {
        const user = await this.usersService.findUser(username);
        const isValid = user && await bcrypt.compare(providedPassword, user.password);

        if (isValid) {
            return {   
                id: user.id,
                name: user.name,
                email: user.email,
                city: user.city
            };
        } else {
            return null;
        }
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        
        return {
            name: user.name,
            city: user.city,
            access_token: this.jwtService.sign(payload),
        };
      }
}
