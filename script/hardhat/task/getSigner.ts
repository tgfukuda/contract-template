import { HardhatRuntimeEnvironment } from 'hardhat/types';

export default function getSigner(hre: HardhatRuntimeEnvironment) {
  if (process.env['RAW_PRIVATE_KEY'] && process.env['ETH_RPC_URL']) {
    return new hre.ethers.Wallet(
      process.env['RAW_PRIVATE_KEY'],
      new hre.ethers.providers.JsonRpcProvider(process.env['ETH_RPC_URL'])
    );
  }
}
