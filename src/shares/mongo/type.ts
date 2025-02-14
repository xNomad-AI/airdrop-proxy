import { COLLECTIONS } from './config.js';

export type CollectionName = (typeof COLLECTIONS)[number]['name'];

export interface AirdropProgram {
  id: string;
  protocol: string;
  version: string;
  name: string;
  description: string;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;

  issuer: {
    name: string;
    officialWebsite: string;
    image: string;
    twitter: string;
    telegram: string;
    discord: string;
    contract?: string;
    token?: string;
    createdAt: Date;
    updatedAt: Date;
  };

  rules: {
    target: Target;
    claimMethod: ClaimMethod;
    claimUrl: string;
    checkEligibilityUrl: string;
    generateMessageUrl?: string;
    blockchain: string;
    contract?: string;
    supportDelegate: boolean;
    startAt: Date;
    expiresAt: Date;
    estimateCost?: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export enum Target {
  nftHolder = 'nftHolder',
  nftAIAgent = 'nftAIAgent',
}

export enum ClaimMethod {
  http = 'http',
  contract = 'contract',
}
