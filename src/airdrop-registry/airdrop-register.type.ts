import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ClaimMethod, Target } from '../shares/mongo/type.js';

export class IssuerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsUrl()
  officialWebsite: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  twitter: string;

  @ApiProperty()
  @IsString()
  telegram: string;

  @ApiProperty()
  @IsString()
  discord: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contract?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  token?: string;
}

export class AirdropRulesDto {
  @ApiProperty({ enum: Target })
  @IsEnum(Target)
  target: Target;

  @ApiProperty({ enum: ClaimMethod })
  @IsEnum(ClaimMethod)
  claimMethod: ClaimMethod;

  @ApiProperty()
  @IsUrl()
  claimUrl: string;

  @ApiProperty()
  @IsUrl()
  checkEligibilityUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  generateMessageUrl?: string;

  @ApiProperty()
  @IsString()
  blockchain: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contract?: string;

  @ApiProperty()
  @IsBoolean()
  supportDelegate: boolean;

  @ApiProperty()
  @IsDateString()
  startAt: string;

  @ApiProperty()
  @IsDateString()
  expiresAt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  estimateCost?: number;
}

export class CreateAirdropProgramDto {
  @ApiProperty({ default: 'AirdropProgramRegistry' })
  @IsString()
  protocol: string;

  @ApiProperty({ default: '0.0.1' })
  @IsString()
  version: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: IssuerDto })
  issuer: IssuerDto;

  @ApiProperty({ type: AirdropRulesDto })
  airdropRules: AirdropRulesDto;
}
