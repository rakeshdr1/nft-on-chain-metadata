import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import HttpOkResponse from '../../shared/http/ok.http';
import { createContractInstance } from '../../shared/contract/createInstance';
import { nftContractABI } from '../../shared/contract/nftContract.abi';
import { nftContractAddress } from '../../common/constants/contract.address';

@Injectable()
export class MetadataService {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  async getMetadata(nftId: number) {
    try {
      const contractConnection = createContractInstance(
        nftContractABI,
        nftContractAddress,
      );

      if (!contractConnection) {
        return {
          name: 'Unknown',
          description: 'metadata not found',
        };
      }

      const metadata = await contractConnection.methods
        .getMetaData(nftId)
        .call();

      const metadataToSend = { attributes: [] };
      for (const key in metadata) {
        if (key == 'name' || key == 'image' || key == 'description') {
          metadataToSend[key] = metadata[key];
        } else if (isNaN(Number(key))) {
          metadataToSend.attributes.push({
            trait_type: key,
            value: metadata[key],
          });
        }
      }
      return new HttpOkResponse({ metadata: metadataToSend });
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }
}
