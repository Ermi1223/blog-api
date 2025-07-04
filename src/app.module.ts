import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import * as path from 'path';
import crypto from 'crypto';

if (!globalThis.crypto) {
  // polyfill global crypto if missing
  // @ts-ignore
  globalThis.crypto = crypto.webcrypto ?? crypto;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'postgres'),
        entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: configService.get<string>('DB_SYNCHRONIZE', 'false') === 'true',
        dropSchema: configService.get<string>('DB_DROP_SCHEMA', 'false') === 'true',
        logging: true,
      }),
    }),
    AuthModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
