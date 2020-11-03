import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { EqualToProp } from "./equal-to-prop.decorator";

export class RegisterUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    city: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { 
            message: 'password must contain at least 1 upper case letter, 1 lower case letter and at least 1 number or special character!' 
        }
    )
    password: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @EqualToProp('password', { message: 'passwordConfirm and password are not equal!'})
    passwordConfirm: string
}