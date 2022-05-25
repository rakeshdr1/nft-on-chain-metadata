import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

import ormconfig from './ormconfig';
import { envSchema } from './shared/schema/env.schema';
import { MetadataModule } from './modules/metadata/metadata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validationSchema: envSchema,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot(ormconfig),
    MetadataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
