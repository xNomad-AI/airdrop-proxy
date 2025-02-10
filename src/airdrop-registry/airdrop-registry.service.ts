import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongoService } from '../shares/mongo/mongo.service.js';
import { AirdropProgram } from '../shares/mongo/type.js';
import { CreateAirdropProgramDto } from './airdrop-register.type.js';

@Injectable()
export class AirdropRegistryService {
  constructor(private readonly mongoService: MongoService) {}

  async registry(data: CreateAirdropProgramDto): Promise<AirdropProgram> {
    const existing = await this.findByName(data.name);
    if (existing) {
      throw new Error(
        `Airdrop program with name "${data.name}" already exists`,
      );
    }

    const newAirdropProgram: AirdropProgram = {
      id: new ObjectId().toString(),
      protocol: data.protocol,
      version: data.version,
      name: data.name,
      description: data.description,
      private: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      issuer: {
        name: data.issuer.name,
        officialWebsite: data.issuer.officialWebsite,
        image: data.issuer.image,
        twitter: data.issuer.twitter,
        telegram: data.issuer.telegram,
        discord: data.issuer.discord,
        contract: data.issuer.contract,
        token: data.issuer.token,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      rules: {
        target: data.airdropRules.target,
        claimMethod: data.airdropRules.claimMethod,
        claimUrl: data.airdropRules.claimUrl,
        checkEligibilityUrl: data.airdropRules.checkEligibilityUrl,
        generateMessageUrl: data.airdropRules.generateMessageUrl,
        blockchain: data.airdropRules.blockchain,
        contract: data.airdropRules.contract,
        supportDelegate: data.airdropRules.supportDelegate,
        startAt: new Date(data.airdropRules.startAt),
        expiresAt: new Date(data.airdropRules.expiresAt),
        estimateCost: data.airdropRules.estimateCost,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const result =
      await this.mongoService.airdropPrograms.insertOne(newAirdropProgram);
    return {
      ...newAirdropProgram,
      id: result.insertedId.toString(),
    };
  }

  async findByName(name: string): Promise<AirdropProgram | null> {
    if (!name) return null;

    return await this.mongoService.airdropPrograms.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, 'i'),
      },
      private: false,
    });
  }

  async getAll(): Promise<AirdropProgram[]> {
    return await this.mongoService.airdropPrograms
      .find({
        private: false,
      })
      .toArray();
  }
}