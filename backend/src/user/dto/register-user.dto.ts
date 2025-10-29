import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

export class LoginUserDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;
}

export class LogoutUserDto {
    @IsNotEmpty({ message: 'Token is required' })
    @IsString({ message: 'Token must be a string' })
    token: string;
}