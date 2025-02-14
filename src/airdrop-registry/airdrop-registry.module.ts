import { Module } from '@nestjs/common';
import { AirdropRegistryController } from './airdrop-registry.controller.js';
import { AirdropRegistryService } from './airdrop-registry.service.js';

@Module({
  imports: [],
  providers: [AirdropRegistryService],
  controllers: [AirdropRegistryController],
  exports: [AirdropRegistryService],
})
export class AirdropRegistryModule {}
