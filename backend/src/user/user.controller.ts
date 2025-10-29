import { Controller, Post, Body, HttpCode, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerUserDto: RegisterUserDto) {
        return await this.userService.register(registerUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(loginUserDto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Headers('authorization') authorization: string) {
        if (!authorization) {
            throw new UnauthorizedException('Unauthorized');
        }
        const token = authorization.replace('Bearer ', '');
        return await this.userService.logout(token);
    }
}

