import {
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
  getUtf8Encoder,
  type Address,
  type ProgramDerivedAddress,
} from '@solana/web3.js';

export type MetadataSeeds = {
  mint: Address;
};

export async function findMetadataPda(
  seeds: MetadataSeeds,
  config: { programAddress?: Address | undefined } = {},
): Promise<ProgramDerivedAddress> {
  const { programAddress = address('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s') } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('metadata'),
      getAddressEncoder().encode(programAddress),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export type AssociatedTokenAccountSeeds = {
  mint: Address;
  owner: Address;
};

export async function findAssociatedTokenPda(
  seeds: AssociatedTokenAccountSeeds,
  config: { tokenProgram?: Address | undefined; programAddress?: Address | undefined } = {},
): Promise<ProgramDerivedAddress> {
  const {
    tokenProgram = address('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    programAddress = address('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getAddressEncoder().encode(seeds.owner),
      getAddressEncoder().encode(tokenProgram),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}
