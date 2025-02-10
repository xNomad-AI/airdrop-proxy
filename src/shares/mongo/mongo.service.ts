import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, Document, MongoClient } from 'mongodb';
import { TransientLoggerService } from '../transient-logger.service.js';
import { COLLECTIONS, DB_NAME } from './config.js';
import { AirdropProgram } from './type.js';

@Injectable()
export class MongoService implements OnModuleInit {
  private client: MongoClient;

  constructor(
    private appConfig: ConfigService,
    private logger: TransientLoggerService,
  ) {
    logger.setContext(MongoService.name);
  }

  async onModuleInit() {
    const source = this.appConfig.get('MONGODB_URL');
    this.client = new MongoClient(source);
    await this.client.connect();
    this.logger.log(`Connected to MongoDB: ${source}`);
    await this.ensureIndexes();
  }

  private async ensureIndexes() {
    const startTime = Date.now();
    const settled = await Promise.allSettled(
      COLLECTIONS.map(async ({ db, name, indexes, uniqueIndexes }) => {
        const collection = this.client.db(db).collection(name);
        if (indexes.length > 0) {
          await Promise.all(
            indexes.map((index: Record<string, number>) =>
              collection.createIndex(index, {}),
            ),
          );
        }

        if (uniqueIndexes.length > 0) {
          await Promise.all(
            uniqueIndexes.map((index: Record<string, number>) =>
              collection.createIndex(index, { unique: true }),
            ),
          );
        }
      }),
    );

    const rejected = settled
      .map((result, index) => {
        if (result.status === 'rejected') {
          return {
            collection: COLLECTIONS[index].name,
            reason: result.reason,
          };
        }
      })
      .filter(Boolean);

    if (rejected.length > 0) {
      this.logger.error('Failed to create indexes: ', JSON.stringify(rejected));
    }
  }

  private getCollection<T extends Document>(name: string): Collection<T> {
    return this.client.db(DB_NAME).collection<T>(name);
  }

  get airdropPrograms() {
    return this.getCollection<AirdropProgram>('airdropPrograms');
  }

}
