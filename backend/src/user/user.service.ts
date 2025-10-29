import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginUserDto, RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<{ message: string; user: { email: string; createdAt: Date } }> {
        const { email, password } = registerUserDto;

        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        try {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const user = this.userRepository.create({
                email,
                password: hashedPassword,
            });

            const savedUser = await this.userRepository.save(user);

            // Return success response without the password
            return {
                message: 'User registered successfully',
                user: {
                    email: savedUser.email,
                    createdAt: savedUser.createdAt,
                },
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw new InternalServerErrorException('An error occurred during registration. Please try again.');
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{ message: string; token: string }> {
        const { email, password } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = jwt.sign({ email: user.email }, config.jwt.secret as string, { expiresIn: '1h' });
        return {
            message: 'Login successful',
            token: token,
        };
    }

    async logout(token: string) {
        try {
            // Verify the token is valid
            const decoded = jwt.verify(token, config.jwt.secret as string);
            return {
                message: 'Logout successful',
            };
        } catch (error) {
            // If token is invalid/expired, still allow logout (client-side cleanup)
            return {
                message: 'Logout successful',
            };
        }
    }
}

