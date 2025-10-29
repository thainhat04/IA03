import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
    let service: UserService;
    let repository: any;

    const mockRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should throw ConflictException if email already exists', async () => {
        const registerDto = { email: 'test@example.com', password: 'password123' };

        mockRepository.findOne.mockResolvedValue({ email: 'test@example.com' });

        await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
        expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });
});

