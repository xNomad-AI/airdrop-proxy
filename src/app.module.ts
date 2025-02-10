import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirdropRegistryModule } from './airdrop-registry/airdrop-registry.module.js';
import { SharedModule } from './shares/shares.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AirdropRegistryModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
