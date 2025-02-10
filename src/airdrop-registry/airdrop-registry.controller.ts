import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAirdropProgramDto } from './airdrop-register.type.js';
import { AirdropRegistryService } from './airdrop-registry.service.js';

@ApiTags('Airdrop Registry')
@Controller('/registry')
export class AirdropRegistryController {
  constructor(
    private readonly airdropRegistryService: AirdropRegistryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register new airdrop program' })
  @ApiResponse({ status: 201, description: 'Program successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async registry(@Body() body: CreateAirdropProgramDto) {
    try {
      const result = await this.airdropRegistryService.registry(body);
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to register airdrop program',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Find airdrop program by name' })
  @ApiResponse({ status: 200, description: 'Program found' })
  @ApiResponse({ status: 404, description: 'Program not found' })
  async findByName(@Query('name') name: string) {
    try {
      if (!name) {
        const result = await this.airdropRegistryService.getAll();
        if (!result) {
          throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
        }
        return { success: true, data: result };
      } else {
        const result = await this.airdropRegistryService.findByName(name);
        if (!result) {
          throw new HttpException('No program', HttpStatus.NOT_FOUND);
        }
        return { success: true, data: [result] };
      }
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to find airdrop program',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
