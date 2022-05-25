import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';

const configObject = new ConfigService();
const HTTP_PROVIDER = configObject.get('HTTP_PROVIDER');

const provider = new Web3.providers.HttpProvider(HTTP_PROVIDER);
const web3 = new Web3(provider);

export default web3;
