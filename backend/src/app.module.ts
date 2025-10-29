import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import config from './config/config';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: config.database.url,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: process.env.NODE_ENV !== 'production', // Auto-create schema in dev only
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false, // For cloud databases (Railway, Render, etc.)
            } : false,
        }),
        UserModule,
    ],
})
export class AppModule { }

