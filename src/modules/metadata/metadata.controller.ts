import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MetadataService } from './metadata.service';

@Controller('metadata')
@ApiTags('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('uri/:nftId')
  async getMetadata(@Param('nftId') nftId: number) {
    return await this.metadataService.getMetadata(nftId);
  }
}
