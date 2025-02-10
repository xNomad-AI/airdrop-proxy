import { Global, Module } from '@nestjs/common';
import { MongoService } from './mongo/mongo.service.js';
import { TransientLoggerService } from './transient-logger.service.js';

@Global()
@Module({
  imports: [],
  providers: [TransientLoggerService, MongoService],
  exports: [TransientLoggerService, MongoService],
})
export class SharedModule {}
