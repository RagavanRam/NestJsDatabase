/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('PSQL_HOST'),
      port: this.config.get<number>('PSQL_PORT'),
      username: this.config.get<string>('PSQL_USER'),
      password: this.config.get<string>('PSQL_PASSWORD'),
      database: this.config.get<string>('PSQL_DATABASE'),
      autoLoadEntities: true,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/database/migrations/*.js'],
      synchronize: this.config.get<boolean>('DB_SYNCHRONIZATION'),
      logging: this.config.get<boolean>('DB_LOGGING'),
    };
  }
}
